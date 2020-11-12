from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.views.generic.base import View
from wedding.models import WeddingType, WeddingSKU, Decorate, DressType, Dress
from django.core.paginator import Paginator

# Create your views here.

class IndexView(View):
    def get(self, request):
        '''显示首页'''
        return render(request, "index.html")


class ThemeView(View):
    def get(self, request, type_id):
        '''显示主题婚礼页面'''
        # 获取婚礼主题种类
        wedding_type = WeddingType.objects.all()
        try:
            type = WeddingType.objects.get(id=type_id)
        except WeddingType.DoesNotExist:
            return JsonResponse({"res": 0, "errmsg": "类型不存在"})
        # 获取婚礼sku
        try:
            wedding_skus = WeddingSKU.objects.filter(type=type)
        except WeddingSKU.DoesNotExist:
            return JsonResponse({"res": 0, "errmsg": "婚礼sku不存在"})
        context = {
            "wedding_type": wedding_type,
            "wedding_skus": wedding_skus
        }
        return render(request, "Wedding_theme.html", context)


class DetailsView(View):
    def get(self, request, sku_id):
        '''显示婚礼详情'''
        try:
            wedding_sku = WeddingSKU.objects.get(id=sku_id)
        except WeddingSKU.DoesNotExist:
            return JsonResponse({"res": 0, "errmsg": "婚礼sku不存在"})
        detail = Decorate.objects.filter(weddingsku=wedding_sku)
        context = {
            "wedding_sku": wedding_sku,
            "details": detail
        }
        return render(request, "theme_details.html", context)


class DressView(View):
    def get(self, request):
        '''显示婚纱礼服页面'''
        dresstypes = DressType.objects.all()
        return render(request, "Wedding _dress.html", {"dresstypes": dresstypes})


class Dresses(View):
    def get(self, request, type_id, page):
        '''显示礼服详情页'''
        # 根据类型id获取礼服类型
        try:
            type = DressType.objects.get(id=type_id)
        except DressType.DoesNotExist:
            # 此类型不存在
            return redirect(reverse("wedding:dress"))
        # # 获取礼服
        # dresses = Dress.objects.filter(type=type)
        #获取排序方式
        sort = request.GET.get("sort", "default")
        # print(sort)
        if sort == "price":
            # 按照价格排序
            dresses = Dress.objects.filter(type=type).order_by("-price")
            # for i in dresses:
            #     print(i.price)
        else:
            # 按照默认排序
            dresses = Dress.objects.filter(type=type).order_by("-create_time")
        #对上面的数据进行分页处理
        P = Paginator(dresses,1)
        #校验页码
        try:
            page = int(page)
        except Exception as e:
            # 如果传递的页码不正确就默认显示1
            page = 1
        if page > P.num_pages:
            page = 1
        #获取指定页的数据
        dresses_page = P.page(page)

        # todo:进行页码的控制，页面上最多显示三个页码
        num_page = P.num_pages
        if num_page < 3:
            pages = range(1, num_page + 1)
        elif page <= 2:
            pages = range(1, 4)
        elif num_page - page <= 2:
            pages = range(num_page - 2, num_page + 1)
        else:
            pages = range(page - 1, page + 2)

        context = {
            "type":type,
            "dresses":dresses,
            "page":page,
            "pages":pages,
            "dresses_page":dresses_page,
            "sort":sort
        }
        # 返回应答
        return render(request, "dresses.html", context)


class DressDetsil(View):
    def get(self,request,dress_id):
        try:
            dressdetail=Dress.objects.get(id = dress_id)
        except Dress.DoesNotExist:
            return redirect(reverse("wedding:dresses"))

        return render(request,"dressdetail.html",{"dressdetail":dressdetail})

    def post(self,request,dress_id):
        pass

class EnvironmentView(View):
    def get(self, request):
        '''显示门店环境'''
        return render(request, "environment.html")


class AboutView(View):
    def get(self, request):
        '''显示关于'''
        return render(request, "about.html")
