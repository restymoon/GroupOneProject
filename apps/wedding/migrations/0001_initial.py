# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('team', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Decorate',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('name', models.CharField(verbose_name='布置场地名称', max_length=20)),
                ('image', models.ImageField(verbose_name='布置场地图片', upload_to='wedding')),
                ('desc', models.CharField(verbose_name='布置场地简介', max_length=256)),
            ],
            options={
                'verbose_name': '布置场地',
                'verbose_name_plural': '布置场地',
                'db_table': 'df_decorate',
            },
        ),
        migrations.CreateModel(
            name='Dress',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('name', models.CharField(verbose_name='礼服名称', max_length=20)),
                ('desc', models.CharField(verbose_name='礼服简介', max_length=256)),
                ('image', models.ImageField(verbose_name='礼服图片', upload_to='dress')),
            ],
            options={
                'verbose_name': '礼服',
                'verbose_name_plural': '礼服',
                'db_table': 'df_dress_sku',
            },
        ),
        migrations.CreateModel(
            name='DressType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('name', models.CharField(verbose_name='种类名称', max_length=20)),
                ('cover_image', models.ImageField(verbose_name='礼服类型封面图片', upload_to='dress')),
            ],
            options={
                'verbose_name': '礼服种类',
                'verbose_name_plural': '礼服种类',
                'db_table': 'df_dress_type',
            },
        ),
        migrations.CreateModel(
            name='WeddingImage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('image', models.ImageField(verbose_name='图片路径', upload_to='wedding')),
            ],
            options={
                'verbose_name': '婚礼图片',
                'verbose_name_plural': '婚礼图片',
                'db_table': 'df_wedding_image',
            },
        ),
        migrations.CreateModel(
            name='WeddingSKU',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('name', models.CharField(verbose_name='婚礼名称', max_length=20)),
                ('desc', models.CharField(verbose_name='婚礼简介', max_length=256)),
                ('video', models.CharField(verbose_name='视频链接', max_length=256)),
                ('cover_image', models.ImageField(verbose_name='婚礼封面图片', upload_to='wedding')),
                ('reason', models.CharField(verbose_name='推荐理由', max_length=256)),
                ('inspiration', models.CharField(verbose_name='创作灵感', max_length=256)),
                ('designer', models.ForeignKey(verbose_name='设计师', to='team.Staff')),
            ],
            options={
                'verbose_name': '婚礼',
                'verbose_name_plural': '婚礼',
                'db_table': 'df_wedding_sku',
            },
        ),
        migrations.CreateModel(
            name='WeddingType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('name', models.CharField(verbose_name='种类名称', max_length=20)),
            ],
            options={
                'verbose_name': '婚礼种类',
                'verbose_name_plural': '婚礼种类',
                'db_table': 'df_wedding_type',
            },
        ),
        migrations.AddField(
            model_name='weddingsku',
            name='type',
            field=models.ForeignKey(verbose_name='婚礼种类', to='wedding.WeddingType'),
        ),
        migrations.AddField(
            model_name='weddingimage',
            name='sku',
            field=models.ForeignKey(verbose_name='婚礼', to='wedding.WeddingSKU'),
        ),
        migrations.AddField(
            model_name='dress',
            name='type',
            field=models.ForeignKey(verbose_name='礼服种类', to='wedding.DressType'),
        ),
        migrations.AddField(
            model_name='decorate',
            name='weddingsku',
            field=models.ForeignKey(verbose_name='婚礼', to='wedding.WeddingSKU'),
        ),
    ]
