from django.db import models
from django.contrib.auth.models import User

class Team(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.user.username

class Ticket(models.Model):
    STATUS = [
        ('todo', 'To Do'),
        ('progress', 'In Progress'),
        ('hold', 'On Hold'),
        ('done', 'Done'),
    ]
    PRIORITY = [
        ('urgent', 'Urgent'),
        ('normal', 'Normal'),
    ]
    TYPE = [
        ('internal', 'Internal'),
        ('external', 'External'),
        ('jira', 'Jira'),
    ]

    ticket_id = models.CharField(max_length=20, unique=True)
    type_of_issue = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS, default='todo')
    priority = models.CharField(max_length=20, choices=PRIORITY, default='normal')
    type = models.CharField(max_length=20, choices=TYPE, default='internal')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.ticket_id} - {self.type_of_issue}"