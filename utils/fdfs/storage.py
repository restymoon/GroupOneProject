from django.core.files.storage import Storage
from fdfs_client.client import Fdfs_client
from GroupOneProject.settings import FDFS_CLIENT_CONF, FDFS_URL


class FDFSStorage(Storage):
    '''fast dfs 文件存储类'''

    def __init__(self, client_conf=None, base_url=None):
        if client_conf is None:
            client_conf = FDFS_CLIENT_CONF
        self.client_conf = client_conf

        if base_url is None:
            base_url = FDFS_URL
        self.base_url = base_url

    def _open(self, name, mode='rb'):
        '''打开文件时使用'''
        pass

    def _save(self, name, content):
        '''
        保存文件时使用
        :param name:
        :param content:
        :return:
        '''
        client = Fdfs_client(self.client_conf)
        # 这个方法接受的参数是图片的二进制数据
        res = client.upload_by_buffer(content.read())
        # 返回值格式如下
        # return dict
        # {
        #     'Group name': group_name,
        #     'Remote file_id': remote_file_id,
        #     'Status': 'Upload successed.',
        #     'Local file name': '',
        #     'Uploaded size': upload_size,
        #     'Storage IP': storage_ip
        # } if success else None
        if res.get("Status") != "Upload successed.":
            # 说明上传失败，手动抛出异常
            raise Exception("图片上传失败")

        # 上传成功
        filename = res.get("Remote file_id")
        return filename

    def exists(self, name):
        return False

    def url(self, name):
        return self.base_url + name
