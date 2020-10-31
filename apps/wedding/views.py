from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request,"index.html")

def dress(request):
    return render(request,"Wedding _dress.html")

def theme(request):
    return render(request,"Wedding_theme.html")

def environment(request):
    return render(request,"environment.html")

def about(request):
    return render(request,"about.html")

def theme_details(request):
    return render(request,"theme_details.html")