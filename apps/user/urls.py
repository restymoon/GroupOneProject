from django.conf.urls import url
from user import views
from django.contrib.auth.decorators import login_required


urlpatterns = [
    url(r'^register/',views.Register.as_view(),name="register"), #注册页面地址,处理注册表单
    url(r'^active/(?P<token>.*)/',views.Active.as_view(),name="active"), #激活用户
    url(r'^login/',views.Login.as_view(),name="login"), #登录页面
    url(r'^logout/', views.Logout.as_view(), name="logout"),  # 退出
    url(r'^checklogin/', views.checkLogin.as_view(), name="checklogin"),  # 检查登陆状态
]