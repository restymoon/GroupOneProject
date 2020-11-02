# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Example',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('name', models.CharField(verbose_name='案例名称', max_length=20)),
                ('cover_image', models.ImageField(verbose_name='案例封面图片', upload_to='example')),
                ('prov', models.CharField(verbose_name='省', max_length=20)),
                ('city', models.CharField(verbose_name='城市', max_length=20)),
                ('comment', models.CharField(verbose_name='新人评论', max_length=256, default='')),
            ],
            options={
                'verbose_name': '案例',
                'verbose_name_plural': '案例',
                'db_table': 'df_example',
            },
        ),
        migrations.CreateModel(
            name='ExampleImage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('image', models.ImageField(verbose_name='图片路径', upload_to='example')),
                ('example', models.ForeignKey(verbose_name='案例', to='example.Example')),
            ],
            options={
                'verbose_name': '案例图片',
                'verbose_name_plural': '案例图片',
                'db_table': 'df_example_image',
            },
        ),
        migrations.CreateModel(
            name='ExampleType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('name', models.CharField(verbose_name='种类名称', max_length=20)),
            ],
            options={
                'verbose_name': '案例种类',
                'verbose_name_plural': '案例种类',
                'db_table': 'df_example_type',
            },
        ),
        migrations.AddField(
            model_name='example',
            name='type',
            field=models.ForeignKey(verbose_name='案例种类', to='example.ExampleType'),
        ),
    ]
