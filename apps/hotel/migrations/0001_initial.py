# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hotel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('name', models.CharField(verbose_name='酒店名字', max_length=20)),
                ('cover_image', models.ImageField(verbose_name='酒店图片', upload_to='example')),
                ('desc', models.CharField(verbose_name='备注', max_length=256, default='')),
                ('city', models.CharField(verbose_name='城市', max_length=20)),
                ('area', models.CharField(verbose_name='地区', max_length=20)),
            ],
            options={
                'verbose_name': '酒店',
                'verbose_name_plural': '酒店',
                'db_table': 'df_hotel',
            },
        ),
        migrations.CreateModel(
            name='Hotelreserve',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('name', models.CharField(verbose_name='宴席类型名称', max_length=20)),
                ('tablenum', models.CharField(verbose_name='预定桌数', max_length=20)),
                ('tableprice', models.CharField(verbose_name='每桌预算', max_length=20)),
            ],
            options={
                'verbose_name': '酒店预定页面',
                'verbose_name_plural': '酒店预定页面',
                'db_table': 'df_hotel_reserve',
            },
        ),
        migrations.AddField(
            model_name='hotel',
            name='hotelreserve',
            field=models.ForeignKey(verbose_name='酒店预订', to='hotel.Hotelreserve'),
        ),
    ]
