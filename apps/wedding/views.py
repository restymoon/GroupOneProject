from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request,"index.html")

def test(request):
    return render(request,"test.html")

def dress(request):
    return render(request,"Wedding _dress.html")

def theme(request):
    return render(request,"Wedding_theme.html")

def hotel(request):
    return render(request,"hotel.html")