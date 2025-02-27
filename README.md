# 使用 Hexo 搭建个人博客并部署到 GitHub Pages 和 Cloudflare Pages

本文详细介绍了如何使用 Hexo 框架搭建一个个人博客，并将其部署到 GitHub Pages 和 Cloudflare Pages 上。主要内容包括：

- 环境准备：安装 Node.js 和 Git
- 配置 Git 和 GitHub：设置 SSH 密钥，创建 GitHub 仓库
- 初始化 Hexo 项目：安装 Hexo，创建新博客
- 部署到 GitHub Pages：配置部署设置，推送静态文件
- 部署到 Cloudflare Pages：连接 GitHub 仓库，自动部署
- 基本使用方法：创建新文章，本地预览，发布更新

---

## 1. 事前准备

- **域名**：非必须，可使用免费域名，或 GitHub.io、Pages.dev 分配的域名
- **GitHub**：必须，注册 GitHub 帐号
- **Cloudflare**：非必须，注册 Cloudflare 帐号（可部署到 CDN 加速，也可直接使用 GitHub.io 分配的域名）

---

## 2. 软件支持

- **Node.js**：必须
- **Git**：必须
- **VSCode**：非必须，推荐使用的代码编辑器

### 2.1 安装 Node.js

1. 打开 [Node.js 官网](https://nodejs.org/en)，下载与系统匹配的安装程序。
2. 安装完成后，打开命令行（`win + R` 键，输入 `cmd`），执行以下命令检查是否安装成功：

    ```shell
    node -v
    ```

3. 修改 npm 源，加快模块下载速度：

    ```shell
    npm config set registry https://mirrors.huaweicloud.com/repository/npm/
    ```

### 2.2 安装 Git

1. 进入 [Git 官网](https://git-scm.com/downloads)，下载适合你当前系统的 Git。
2. 下载后进行安装，安装路径建议使用默认路径 `C:/Program Files/Git`。
3. 安装后，你可以在电脑的开始菜单中找到 `Git CMD`、`Git Bash` 和 `Git GUI`。
    - **Git CMD**：Windows 命令行风格
    - **Git Bash**：Linux 命令行风格（建议使用）
    - **Git GUI**：图形化界面（不建议新手使用）

---

## 3. 配置 Git 密钥并连接至 GitHub

### 3.1 配置 Git 用户名和邮箱

1. 打开 `Git Bash`，输入以下命令配置 Git 用户名和邮箱：

    ```bash
    git config --global user.name "你的用户名"
    git config --global user.email "你的邮箱"
    ```

### 3.2 配置 SSH 公钥连接 GitHub

1. 执行以下命令生成 SSH 公钥，此公钥用于你的计算机连接 GitHub：

    ```bash
    ssh-keygen -t rsa -C "你的邮箱"
    ```

   提示 `Enter file in which to save the key` 后直接一路回车即可。新手小白不推荐设置密钥。之后，打开 C 盘下用户文件夹的 `.ssh` 文件夹。

    - `id_rsa` 私钥
    - `id_rsa.pub` 公钥

   用记事本打开 `id_rsa.pub` 文件，复制里面的内容。

2. 将 SSH 公钥配置到 GitHub：

   进入 GitHub，点击右上角头像，选择 `Settings`，然后进入 `SSH and GPG keys`，名字随意起，将公钥粘贴到 `Key` 一栏。

3. 测试连接，输入以下命令：

    ```bash
    ssh -T git@github.com
    ```

4. 成功连接后，会出现以下信息：

    ```
    Hi username! You've successfully authenticated, but GitHub does not provide shell access.
    ```

   出现上述信息说明连接成功，至此完成了环境准备工作。

---

## 4. 初始化 Hexo 博客

### 4.1 安装 Hexo

1. 输入以下命令安装 Hexo：

    ```bash
    npm install -g hexo-cli
    hexo -v
    ```

2. 启动项目：

    ```bash
    hexo clean && hexo server
    ```

3. 打开浏览器访问 `http://localhost:4000` 查看博客预览。

### 4.2 将静态博客挂载到 GitHub Pages

1. **创建 GitHub.io 仓库**

   点击右上角的 `+` 按钮，选择 **New repository**，创建一个 `<用户名>.github.io` 的仓库。
    - 仓库名字的格式必须为：`<用户名>.github.io`（注意：前缀必须为用户名，这是预览博客所需，后期可修改仓库名）。
    - 可见性必须选择 **Public**，方便第一次部署检查问题。
    - 点击 **Create repository** 进行创建。

2. **安装 hexo-deployer-git**

    ```bash
    npm install hexo-deployer-git --save
    ```

3. **修改 `_config.yml` 文件**:

    - 在 `项目根目录` 下的 `_config.yml` 文件中，进行 Hexo 框架的配置修改。
    - 可以在该文件中修改大部分的配置，详细可参考官方的配置描述。修改最后一行的配置，将 `repository` 修改为你自己的 GitHub 项目地址，并将 `branch` 修改为 `main` 主分支（注意缩进）。

    ```yaml
    deploy:
      type: git
      repository: git@github.com:<用户名>/<用户名>.github.io.git
      branch: main
    ```

4. **运行如下命令，将代码部署到 GitHub（Hexo 三连）**：

   **使用 Git Bash 终端：**

    ```bash
    hexo clean && hexo generate && hexo deploy
    ```

   **或使用 VSCode 终端：**
   
    ```bash
    hexo cl; hexo g; hexo d
    ```

   其中：

    - `hexo clean`：删除之前生成的文件，可以用 `hexo cl` 缩写。
    - `hexo generate`：生成静态文章，可以用 `hexo g` 缩写。
    - `hexo deploy`：部署文章，可以用 `hexo d` 缩写。

   注意：`deploy` 时可能需要你输入 GitHub 的 `username` 和 `password`。如果出现 `Deploy done`，则说明部署成功了。

   部署完成后，稍等几分钟，打开浏览器访问 `https://<用户名>.github.io`，即可看到博客内容。

### 4.3 将静态博客挂载到 Cloudflare Pages

（待续）

---

## 5. Hexo 配置文件及模板说明

### 5.1 配置主题

1. **本地预览**

    ```bash
    hexo cl; hexo s
    ```

2. **推送更新上线**
    ```bash
    hexo cl; hexo g; hexo d
    ```
### 5.2 **生成标签页和分类页**

1. **执行以下命令生成标签页**

    ```bash
    hexo new page tags
    ```

- 找到 source/tags/index.md 这个文件，修改添加 type: "tags"
    ```yaml
    title: 标签
    date: 2024-07-05 03:36:02
    type: "tags"
    comments: false
    top_img: false
    ```

- 剩下的工作就是配置_config.yml和_config.anzhiyu.yml文件，修改博客参数。


### 5.3. **配置文章模版**

- `/scaffolds` 目录下有几个模版文件，其中：
  - `post.md`：新建博文模版
  - `page.md`：新建标签页模版

1. **post.md 模版，仅供参考**

    ```yaml
    title: {{ title }} #【必需】页面标题
    date: {{ date }} #【必需】页面创建日期
    updated: #【可选】页面更新日期
    tags: #【可选】文章标签
    categories: #【可选】文章分类
    keywords: #【可选】文章关键字
    description: #【可选】文章描述
    top: # 1 置顶
    top_img: #【可选】文章顶部图片
    comments: #【可选】显示文章评论模块(默认 true)
    cover:  #【可选】文章缩略图(如果没有设置 top_img,文章页顶部将显示缩略图，可设为 false/图片地址/留空)
    toc: #【可选】显示文章 TOC(默认为设置中 toc 的 enable 配置)
    toc_number: #【可选】显示 toc_number(默认为设置中 toc 的 number 配置)
    toc_style_simple: #【可选】显示 toc 简洁模式
    copyright: #【可选】显示文章版权模块(默认为设置中 post_copyright 的 enable 配置)
    copyright_author: #【可选】文章版权模块的文章作者
    copyright_author_href: #【可选】文章版权模块的文章作者链接
    copyright_url: #【可选】文章版权模块的文章作者链接
    copyright_info: #【可选】文章版权模块的版权声明文字
    mathjax: #【可选】显示 mathjax(当设置 mathjax 的 per_page: false 时，才需要配置，默认 false)
    katex: #【可选】显示 katex(当设置 katex 的 per_page: false 时，才需要配置，默认 false)
    aplayer: #【可选】在需要的页面加载 aplayer 的 js 和 css,请参考文章下面的音乐配置
    highlight_shrink: #【可选】配置代码框是否展开(true/false)(默认为设置中 highlight_shrink 的配置)
    aside: #【可选】显示侧边栏 (默认 true)
    swiper_index: 10 #【可选】首页轮播图配置 index 索引，数字越小越靠前
    top_group_index: 10 #【可选】首页右侧卡片组配置, 数字越小越靠前
    ai: #【可选】文章 ai 摘要
    background: "#fff" #【可选】文章主色，必须是 16 进制颜色且有 6 位，不可缩减，例如 #ffffff 不可写成 #fff
    
    <div class="video-container">
    [up主专用，视频内嵌代码贴在这]
    </div>
    
    <style>
    .video-container {
        position: relative;
        width: 100%;
        padding-top: 56.25%; /* 16:9 aspect ratio (height/width = 9/16 * 100%) */
    }
    
    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    </style>
    ```

2. page.md 模版，仅供参考

    ```yaml
    title: {{ title }} #【必需】页面标题
    date: {{ date }} #【必需】页面创建日期
    type: #【必需】标签、分类、关于、音乐馆、友情链接、相册、相册详情、朋友圈、即刻页面需要配置
    updated: #【可选】页面更新日期
    comments: #【可选】显示页面评论模块(默认 true)
    description: #【可选】页面描述
    keywords: #【可选】页面关键字
    top_img: https://img.090227.xyz/file/ae62475a131f3734a201c.png #【可选】页面顶部图片
    mathjax: #【可选】显示 mathjax(当设置 mathjax 的 per_page: false 时，才需要配置，默认 false)
    katex: #【可选】显示 katex(当设置 katex 的 per_page: false 时，才需要配置，默认 false)
    aside: #【可选】显示侧边栏 (默认 true)
    aplayer: #【可选】在需要的页面加载 aplayer 的 js 和 css,请参考文章下面的音乐配置
    highlight_shrink: #【可选】配置代码框是否展开(true/false)(默认为设置中 highlight_shrink 的配置)
    top_single_background: #【可选】部分页面的顶部模块背景图片
    ```

## 6. Hexo 配置文件及模板说明

1. **新建文章**

    ```bash
    # 新建博文命令
    hexo new 这是一篇新的博文
    ```
2. **新建页面**

    ```bash
    # 新建标签页命令
    hexo new page 新建的标签页
    ```
3. **文章置顶**

    3.1 **安装插件：**
    ```bash
    npm install hexo-generator-topindex --save
    ```
    3.2 **设置置顶： 给需要置顶的文章加入 top 参数，如下：**
    ```yaml
    title: 每天一个linux命令
    date: 2017-01-23 11:41:48
    top: 1
    categories:
    - 运维
    tags:
    - linux命令
    ```
- 如果存在多个置顶文章，top 后的参数越大，越靠前。

4. **开启本地搜索**
- 安装插件： 你需要安装 hexo-generator-search，根据它的文档去做相应配置：
  ```bash
  npm install hexo-generator-search --save
  ```
- 配置主题配置文件_config.anzhiyu.yml文件：
  ```yaml
    local_search:
    enable: true
    preload: false
    CDN:
  ```


| 参数   | 解释                                                             |
|--------|------------------------------------------------------------------|
| enable | 是否开启本地搜索                                               |
| preload| 预加载，开启后，进入网页后会自动加载搜索文件。关闭时，只有点击搜索按钮后，才会加载搜索文件 |
| CDN    | 搜索文件的 CDN 地址（默认使用的本地链接）                     |
