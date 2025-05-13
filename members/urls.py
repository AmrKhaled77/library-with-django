from django.urls import path
from .views import signup_view, login_view, logout_view,user_dashboard_view,admin_dashboard_view,index_view,user_borrowed_books_view,user_search_books_view,user_view_books_view,admin_add_book_view,admin_view_books_view


from django.urls import path


urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('user_dashboard/', user_dashboard_view, name='user_dashboard_view'),
    path('admin_dashboard/', admin_dashboard_view, name='admin_dashboard_view'),
    path('', index_view, name='index_view'),
    path('user_borrowed_books/', user_borrowed_books_view, name='user_borrowed_books_view'),
    path('user_search_books/', user_search_books_view, name='user_search_books_view'),
    path('user_view_books/', user_view_books_view, name='user_view_books_view'),
    path('admin_add_book/', admin_add_book_view, name='admin_add_book_view'),
    path('admin_view_books/', admin_view_books_view, name='admin_view_books_view'),
    
  
]



