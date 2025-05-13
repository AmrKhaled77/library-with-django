from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib import messages

User = get_user_model()

def signup_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm-password")
        user_type = request.POST.get("user-type")

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return render(request, "members/signup.html")

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already taken.")
            return render(request, "members/signup.html")
        

        

        User.objects.create_user(username=username, email=email, password=password, user_type=user_type)
        messages.success(request, "Account created successfully.")
        return redirect("login")  

    return render(request, "members/signup.html")



from django.contrib.auth import authenticate, login


from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .models import CustomUser

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            if user.user_type == 'admin':
             return redirect('admin_dashboard_view') 
            else:
                return redirect('user_dashboard_view') 
        else:
            return render(request, 'members/login.html', {'error': 'Invalid credentials'})

    return render(request, 'members/login.html')





from django.contrib.auth import logout

def logout_view(request):
    logout(request)
    return redirect("login")





def user_dashboard_view(request):
    return render(request, 'members/user_dashboard.html') 



def admin_dashboard_view(request):
    return render(request, 'members/admin_dashboard.html') 



def index_view(request):
    return render(request, 'members/index.html') 

def user_borrowed_books_view(request):
    return render(request, 'members/user_borrowed_books.html') 

def user_search_books_view(request):
    return render(request, 'members/user_search_books.html') 

def user_view_books_view(request):
    return render(request, 'members/user_view_books.html') 


def admin_add_book_view(request):
    return render(request, 'members/admin_add_book.html') 



def admin_view_books_view(request):
    return render(request, 'members/admin_view_books.htm') 








