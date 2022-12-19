1. 进入到电脑账户文件下摘掉.ssh文件(如果没有新建一个)

    ssh-keygen -t rsa -C "cnmengkang@gmail.com" -f  "id_rsa_github"

    ssh-keygen -t rsa -C "cnmengkang@gmail.com" -f  "id_rsa_gitee"

2. 三次回车

3. cat id_rsa_github.pub 查看github的sshkey 添加到gitee与githu

4. vi config 新建config 文件 推出git 先按  esc 输入 :wq


#==============================
# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_gitee
 
# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_github
#==============================

5. 复制上面代码到config里面

6. 1ssh -T git@gitee.com 查看是否成功，如果出现下述代码 输入yes就行了
7. 
#==============================================
The authenticity of host 'gitee.com (212.64.63.190)' can't be established.
ECDSA key fingerprint is SHA256:FQGC9Kn/eye1W8icdBgrQp+KkGYoFgbVr17bmjey0Wc.
Are you sure you want to continue connecting (yes/no/[fingerprint]) 
#==============================================


