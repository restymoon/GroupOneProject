"""GroupOneProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from wedding import views
from django.conf.urls import url

urlpatterns = [
    url(r"^$", views.IndexView.as_view(), name="index"),  # 首页
    url(r"^theme/(?P<type_id>\d+)/", views.ThemeView.as_view(), name="theme"), #最新产品
    # url(r"^hottheme/", views.NewThemeView.as_view(), name="hottheme"), #热门产品
    url(r"^dress/", views.DetailsView.as_view(), name="dress"),
    url(r"^environment/", views.EnvironmentView.as_view(), name="environment"),
    url(r"^about/", views.AboutView.as_view(), name="about"),
    url(r"^details/(?P<sku_id>\d+)/", views.DetailsView.as_view(), name="details"),
    # url(r"^test/", views.test, name="test"),
]
