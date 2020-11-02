# import os
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "GroupOneProject.settings")  #加载配置文件
# import django
# django.setup() #初始化

from celery import Celery  # 导入可以执行异步任务的包
# from django.template import loader, RequestContext
from GroupOneProject import settings
from django.core.mail import send_mail
# from goods.models import GoodsType, IndexGoodsBanner, IndexPromotionBanner, IndexTypeGoodsBanner

app = Celery("celery_tasks.tasks", broker="redis://192.168.72.129/8")


@app.task  # 进行装饰
def send_register_active_email(user_name, email, token):
    subject = "蜜匠婚礼欢迎您注册"
    message = "<h1>%s,欢迎您成为蜜匠婚礼注册会员,请点击下面链接进行激活：</h1>" \
              "<a href='http://127.0.0.1:8000/user/active/%s'>" \
              "http://127.0.0.1:8000/user/active/%s</a>" % (user_name, token, token)
    sender = settings.EMAIL_FROM
    receiver = [email]
    send_mail(subject, message, sender, receiver, html_message=message)


@app.task  # 进行装饰
def send_forgetpwd_email(user_name, email, token):
    subject = "天天生鲜请您忘记密码"
    message = "<h1>%s,请点击下面链接进行忘记密码：</h1>" \
              "<a href='http://127.0.0.1:8000/user/forgetpwd_email/%s'>" \
              "http://127.0.0.1:8000/user/forgetpwd_email/%s</a>" % (user_name, token, token)
    sender = settings.EMAIL_FROM
    receiver = [email]
    send_mail(subject, message, sender, receiver, html_message=message)


# @app.task
# def generate_static_index_html():
#     '''产生首页静态页面'''
#     '''显示首页'''
#     # 获取所有种类信息
#     types = GoodsType.objects.all()
#
#     # 获取轮播图信息
#     goods_banners = IndexGoodsBanner.objects.all().order_by("index")
#
#     # 获取促销活动信息
#     promotion_banners = IndexPromotionBanner.objects.all().order_by("index")[0:2]
#
#     # 获取首页分类产品展示信息
#     for type in types:
#         image_banners = IndexTypeGoodsBanner.objects.filter(type=type, display_type=1).order_by("index")[0:4]
#         title_banners = IndexTypeGoodsBanner.objects.filter(type=type, display_type=0).order_by("index")[0:4]
#         type.image_banners = image_banners
#         type.title_banners = title_banners
#
#     context = {"types": types, "goods_banners": goods_banners,
#                "promotion_banners": promotion_banners}
#
#     # 使用模板
#     # 1.加载模板文件,返回模板对象
#     tt = loader.get_template("static_index.html")  # 使用这个文件生成静态文件
#     # 2.为指定的文件传递数据
#     static_index_html = tt.render(context)
#     # 定义静态文件保存的路径
#     save_path = os.path.join(settings.BASE_DIR, "static/index.html")
#     # 生成
#     with open(save_path, "w") as f:
#         f.write(static_index_html)
