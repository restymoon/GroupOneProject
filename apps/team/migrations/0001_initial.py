# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Profession',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('name', models.CharField(verbose_name='职业名称', max_length=20)),
                ('desc', models.CharField(verbose_name='职业简介', max_length=256)),
                ('image', models.ImageField(verbose_name='职业图片', upload_to='profession')),
            ],
            options={
                'verbose_name': '职业名称',
                'verbose_name_plural': '职业名称',
                'db_table': 'df_profession',
            },
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('staffname', models.CharField(verbose_name='员工姓名', max_length=20)),
                ('image', models.ImageField(verbose_name='员工照片', upload_to='staff')),
                ('nickname', models.CharField(verbose_name='职业别称', max_length=20)),
                ('experience', models.CharField(verbose_name='经验', max_length=20)),
                ('number', models.IntegerField(verbose_name='场次', default=1)),
                ('grade', models.DecimalField(verbose_name='评分', max_digits=3, decimal_places=2)),
                ('profession', models.ForeignKey(verbose_name='职业', to='team.Profession')),
            ],
            options={
                'verbose_name': '员工',
                'verbose_name_plural': '员工',
                'db_table': 'df_staff',
            },
        ),
        migrations.CreateModel(
            name='TeamType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('create_time', models.DateTimeField(verbose_name='创建时间', auto_now_add=True)),
                ('update_time', models.DateTimeField(verbose_name='更新时间', auto_now=True)),
                ('is_delete', models.BooleanField(verbose_name='删除标记', default=False)),
                ('name', models.CharField(verbose_name='种类名称', max_length=20)),
            ],
            options={
                'verbose_name': '团队种类',
                'verbose_name_plural': '团队种类',
                'db_table': 'df_team_type',
            },
        ),
        migrations.AddField(
            model_name='profession',
            name='type',
            field=models.ForeignKey(verbose_name='团队种类', to='team.TeamType'),
        ),
    ]
