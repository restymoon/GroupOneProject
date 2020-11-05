from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.views.generic.base import View
from wedding.models import WeddingType, WeddingSKU, Decorate


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
        return render(request, "Wedding _dress.html")


class EnvironmentView(View):
    def get(self, request):
        '''显示门店环境'''
        return render(request, "environment.html")


class AboutView(View):
    def get(self, request):
        '''显示关于'''
        return render(request, "about.html")
