from django.db import models

class Student(models.Model):
    student_id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    class_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    language = models.CharField(max_length=10, default='en')

    def __str__(self):
        return self.name

class MealAttendance(models.Model):
    ATTENDANCE_CHOICES = [
        ('Yes', 'Yes'),
        ('No', 'No'),
    ]
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()
    breakfast = models.CharField(max_length=3, choices=ATTENDANCE_CHOICES, default='No')
    lunch = models.CharField(max_length=3, choices=ATTENDANCE_CHOICES, default='No')
    dinner = models.CharField(max_length=3, choices=ATTENDANCE_CHOICES, default='No')
    reason = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('student', 'date')

class SnackItem(models.Model):
    snack_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return self.name

class Feedback(models.Model):
    MEAL_TYPES = [
        ('Breakfast', 'Breakfast'),
        ('Lunch', 'Lunch'),
        ('Dinner', 'Dinner'),
    ]
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    meal_type = models.CharField(max_length=20, choices=MEAL_TYPES)
    feedback_text = models.TextField()
    date = models.DateField()

class ImageGallery(models.Model):
    CATEGORIES = [
        ('Storage', 'Storage Room'),
        ('Kitchen', 'Kitchen'),
        ('Counter', 'Food Counter'),
        ('Dining', 'Dining Area'),
    ]
    id = models.AutoField(primary_key=True)
    image_url = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORIES)

class Staff(models.Model):
    staff_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50)
    contact = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.role})"

class MenuBoard(models.Model):
    MEAL_TYPES = [
        ('Breakfast', 'Breakfast'),
        ('Lunch', 'Lunch'),
        ('Dinner', 'Dinner'),
    ]
    id = models.AutoField(primary_key=True)
    date = models.DateField()
    meal_type = models.CharField(max_length=20, choices=MEAL_TYPES)
    items = models.TextField()

    class Meta:
        unique_together = ('date', 'meal_type')
