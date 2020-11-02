# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('example', '0001_initial'),
        ('wedding', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='example',
            name='user',
            field=models.ForeignKey(verbose_name='评论人', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='example',
            name='wedding',
            field=models.ForeignKey(verbose_name='婚礼', to='wedding.WeddingSKU'),
        ),
    ]
