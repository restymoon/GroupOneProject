from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request,"index.html")

def dress(request):
    return render(request,"Wedding _dress.html")

def theme(request):
    return render(request,"Wedding_theme.html")
