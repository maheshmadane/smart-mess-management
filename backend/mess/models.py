from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    def __str__(self):
        return self.user.username

class MealAttendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()
    meal_type = models.CharField(max_length=50)
    present = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.student.user.username} - {self.date} - {self.meal_type}"

class SnackItem(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return self.name

class Feedback(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.rating} stars by {self.student.user.username if self.student else 'Anonymous'}"

class ImageGallery(models.Model):
    photo = models.ImageField(upload_to='gallery/', null=True, blank=True)
    caption = models.CharField(max_length=200)

    def __str__(self):
        return self.caption

class Staff(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    photo = models.ImageField(upload_to='staff/', null=True, blank=True)

    def __str__(self):
        return self.name

class MenuBoard(models.Model):
    date = models.DateField()
    meal_type = models.CharField(max_length=50)
    dishes = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.date} - {self.meal_type}"

class Note(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content[:50]

class Rule(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title