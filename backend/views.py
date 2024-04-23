# Create your views here.
import json
import jwt
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Message

@csrf_exempt
def login_get(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
            user = authenticate(request, username=username, password=password)
            if user is not None:
                # Authentication successful
                login(request, user)

                # Generate JWT token
                refresh = RefreshToken.for_user(user)
                token = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }

                # Add admin role to the token payload if user is admin
                role = 'admin' if user.is_superuser else 'read-only'

                return JsonResponse({'message': 'Login successful', 'token': token, 'role': role})
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=401)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

@csrf_exempt
def get_data(request):
    try:
        token = request.headers['Authorization'].split()[1]
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = decoded_token['user_id']
        user = User.objects.get(pk=user_id)
        if user is None:
            return JsonResponse({"error": "Unauthorized"}, status=403)
        else:
            role = 'admin' if user.is_superuser else 'read-only'
            if role == 'read-only':
                messages = Message.objects.all().values('id', 'userID', 'message')
            elif role == 'admin':
                messages = Message.objects.all().values('id', 'userID', 'message')
            return JsonResponse(list(messages), safe=False)
    except Exception as e:
        return JsonResponse({"Error in fetching data.": str(e)}, status=403)

@csrf_exempt
def add_data(request):
    try:
        token = request.headers['Authorization'].split()[1]
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = decoded_token['user_id']
        user = User.objects.get(pk=user_id)
        if user is None or not user.is_superuser:
            return JsonResponse({"Error": "User does not have access"}, status=403)
        else:
            if request.method == 'POST':
                try:
                    data = json.loads(request.body)
                    message = Message(userID=data['userID'], message=data['message'])
                    message.save()
                    return JsonResponse({"message": "Data added successfully"})
                except json.JSONDecodeError:
                    return JsonResponse({'error': 'Invalid JSON data'}, status=400)
                except KeyError:
                    return JsonResponse({'error': 'Invalid JSON data with KeyError'}, status=401)
            else:
                return JsonResponse({"error": "Invalid method"}, status=405)
    except Exception as e:
        return JsonResponse({"Error in adding data": str(e)}, status=403)

@csrf_exempt
def update_data(request, id):
    try:
        token = request.headers['Authorization'].split()[1]
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = decoded_token['user_id']
        user = User.objects.get(pk=user_id)
        if user is None or not user.is_superuser:
            return JsonResponse({"error": "User does not have access"}, status=403)
        else:
            message = get_object_or_404(Message, pk=id)
            if request.method == 'PUT':
                try:
                    data = json.loads(request.body)
                    if 'userID' in data:
                        message.userID = data['userID']
                    if 'message' in data:
                        message.message = data['message']
                    message.save()
                    return JsonResponse({"message": "Data updated successfully"})
                except json.JSONDecodeError:
                    return JsonResponse({'error': 'Invalid JSON data'}, status=400)
                except KeyError:
                    return JsonResponse({'error': 'Invalid JSON data with KeyError'}, status=401)
            else:
                return JsonResponse({"error": "Wrong Http Method."}, status=405)
    except Exception as e:
        return JsonResponse({"error, unable to update data.": str(e)}, status=403)