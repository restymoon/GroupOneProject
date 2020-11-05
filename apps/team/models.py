from django.db import models
from db.base_model import BaseModel



# Create your models here.
class TeamType(BaseModel):
    """ 团队种类模型类"""
    name = models.CharField(max_length=20, verbose_name="种类名称")


    class Meta:
        db_table = 'df_team_type'
        verbose_name = "团队种类"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Profession(BaseModel):
    """ 职业模型类"""
    type = models.ForeignKey("TeamType", verbose_name="团队种类")
    name = models.CharField(max_length=20, verbose_name="职业名称")
    desc = models.CharField(max_length=256, verbose_name="职业简介")
    image = models.ImageField(upload_to="profession", verbose_name="职业图片")

    class Meta:
        db_table = 'df_profession'
        verbose_name = "职业名称"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

class Staff(BaseModel):
    ''' 员工模型类 '''
    profession = models.ForeignKey("Profession", verbose_name="职业")
    staffname = models.CharField(max_length=20, verbose_name="员工姓名")
    image = models.ImageField(upload_to="staff", verbose_name="员工照片")
    nickname = models.CharField(max_length=20, verbose_name="职业别称")
    experience = models.CharField(max_length=20, verbose_name="经验")
    number = models.IntegerField(default=1, verbose_name="场次")
    grade = models.DecimalField(max_digits=3, decimal_places=2, verbose_name="评分")

    class Meta:
        db_table = 'df_staff'
        verbose_name = "员工"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.staffname








