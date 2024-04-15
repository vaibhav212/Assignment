"""
URL configuration for RBC project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rbcassignment import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login_get', views.login_get, name='login_get'),
    path('get_data', views.get_data, name='get_data'),
    path('add_data', views.add_data, name='add_data'),
    path('update_data/<int:id>', views.update_data, name='update_data'),
]
