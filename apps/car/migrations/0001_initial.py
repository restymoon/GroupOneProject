# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('name', models.CharField(verbose_name='车名', max_length=20)),
                ('color', models.CharField(verbose_name='婚车颜色', max_length=20)),
                ('image', models.ImageField(verbose_name='婚车图片', upload_to='carbrand')),
            ],
            options={
                'verbose_name': '婚车',
                'verbose_name_plural': '婚车',
                'db_table': 'df_car',
            },
        ),
        migrations.CreateModel(
            name='CarBrand',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('name', models.CharField(verbose_name='婚车品牌', max_length=20)),
                ('logoimage', models.ImageField(verbose_name='婚车品牌图片', upload_to='carbrand')),
            ],
            options={
                'verbose_name': '婚车品牌',
                'verbose_name_plural': '婚车品牌',
                'db_table': 'df_car_brand',
            },
        ),
        migrations.CreateModel(
            name='CarType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('name', models.CharField(verbose_name='车型', max_length=20)),
                ('image', models.ImageField(verbose_name='车型图片', upload_to='carbrand')),
            ],
            options={
                'verbose_name': '商品SPU',
                'verbose_name_plural': '商品SPU',
                'db_table': 'df_car_type',
            },
        ),
        migrations.AddField(
            model_name='car',
            name='brand',
            field=models.ForeignKey(verbose_name='品牌', to='car.CarBrand'),
        ),
        migrations.AddField(
            model_name='car',
            name='type',
            field=models.ForeignKey(verbose_name='车型', to='car.CarType'),
        ),
    ]
