from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.views.generic.base import View
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, SignatureExpired
from user.models import User
from GroupOneProject import settings
from celery_tasks.tasks import send_register_active_email
from django.contrib.auth import authenticate, login, logout
import re


# Create your views here.

class Register(View):
    def get(self,request):
        '''显示注册页面'''
        return render(request,"register.html")
    def post(self,request):
        '''处理注册页面的表单'''
        #  接收表单中 的数据
        user_name = request.POST.get("user_name")
        pwd = request.POST.get("pwd")
        cpwd = request.POST.get("cpwd")
        email = request.POST.get("email")
        allow = request.POST.get("allow")
        #  校验表单中的数据
        if not all([user_name, pwd, cpwd, email]):
            return render(request, "register.html", {"msg": "注册数据不完整"})
        if not re.match("^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$", email):
            return render(request, "register.html", {"msg": "邮箱格式不正确"})
        if pwd != cpwd:
            return render(request, "register.html", {"msg": "两次密码输入不一致"})
        if allow != "on":
            return render(request, "register.html", {"msg": "请同意协议"})
        #  校验用户名是否重复
        try:
            user = User.objects.get(username=user_name)
        except User.DoesNotExist:
            user = None

        if user != None:
            return render(request, "register.html", {"msg": "用户名已存在"})
        #  业务处理
        user = User.objects.create_user(user_name, email, pwd)
        user.is_active = 0
        user.save()

        # todo 注册成功以后 ，往邮箱发送一份邮件 ，进行激活
        ss = Serializer(settings.SECRET_KEY, 3600)
        info = {"user_id": user.id}
        token = ss.dumps(info).decode()

        # 异步发送邮件
        send_register_active_email.delay(user_name, email, token)

        #  返回应答
        return redirect(reverse("wedding:index"))  # 重定向到首页

class Active(View):
    def get(self, request, token):
        # 解密
        ss = Serializer(settings.SECRET_KEY, 3600)
        token = token.encode()
        try:
            info = ss.loads(token)
            user = User.objects.get(id=info.get("user_id"))
            user.is_active = 1
            user.save()
            return redirect(reverse("user:login"))  # 激活进入登录页面
        except SignatureExpired as e:
            return HttpResponse("激活链接已过期")

class Login(View):
    def get(self, request):
        if "username" in request.COOKIES:
            username = request.COOKIES.get("username")
            checked = "checked"
        else:
            username = ""
            checked = ""
        return render(request, "login.html", {"username": username, "checked": checked})

    def post(self, request):
        # 接收数据
        username = request.POST.get("username")
        pwd = request.POST.get("pwd")
        remember = request.POST.get("remember")
        # 校验数据
        if not all([username, pwd]):
            return render(request, "login.html", {"msg": "数据不完整"})
        # 业务处理
        user = authenticate(username=username, password=pwd)
        if user is not None:
            if user.is_active:
                # 用户已激活
                login(request, user)
                next = request.GET.get("next", reverse("wedding:index"))
                res = redirect(next)
                if remember == "on":
                    # 记住用户名
                    res.set_cookie("username", username, 7 * 24 * 3600)
                else:
                    res.delete_cookie("username")
                return res
            else:
                # 未激活
                return render(request, "login.html", {"msg": "用户未激活"})
        else:
            # 用户名密码错误
            return render(request, "login.html", {"msg": "用户名或密码错误"})

class Logout(View):
    '''退出登录'''

    def get(self, request):
        logout(request)
        return redirect(reverse("wedding:index"))

class checkLogin(View):
    # 检查是否登录
    def get(self,request):
        user = request.user
        if not user.is_authenticated():
            return JsonResponse({"code": 0, "msg": "未登录"})
        else:
            user_name = user.username
            return JsonResponse({"code": 1, "msg": "已登录","user_name":user_name})