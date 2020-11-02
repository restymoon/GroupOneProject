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
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^wedding/',include('wedding.urls',namespace="wedding")),
    url(r'^team/',include('team.urls',namespace="team")),
    url(r'^hotel/',include('hotel.urls',namespace="hotel")),
    url(r'^example/',include('example.urls',namespace="example")),
    url(r'^car/',include('car.urls',namespace="car")),
    url(r'^user/',include('user.urls',namespace="user")),
]
