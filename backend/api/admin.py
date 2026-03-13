from django.contrib import admin
from .models import Ticket, Team, UserProfile

admin.site.register(Ticket)
admin.site.register(Team)
admin.site.register(UserProfile)