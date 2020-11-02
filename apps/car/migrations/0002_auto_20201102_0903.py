# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('car', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='cartype',
            options={'verbose_name': '车型', 'verbose_name_plural': '车型'},
        ),
    ]
