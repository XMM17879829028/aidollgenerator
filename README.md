# Starter Pack Prompt Creator

这是一个用于生成Starter Pack图片提示词的工具，帮助用户轻松创建高质量的AI图片生成提示词。

## 项目结构

### 前端 (frontend/)
- `index.html`: 主页面，包含完整的用户界面
  - 使用Tailwind CSS进行样式设计
  - 包含四个主要选项卡：角色、容器、场景和图像风格
  - 实现了响应式设计和现代化的UI交互
- `js/`: JavaScript文件目录
- `css/`: CSS样式文件目录

### 后端 (backend/)
- `app.py`: Flask后端服务器
  - 使用Flask框架构建RESTful API
  - 实现了WebSocket连接用于实时通信
  - 主要功能：
    - 保存和加载游戏状态
    - 处理用户连接和断开连接
    - 管理游戏动作和状态更新
- `requirements.txt`: Python依赖包列表

## 主要功能

1. 角色定制
   - 选择预设角色风格或自定义
   - 设置角色名称
   - 描述服装和配件
   - 指定角色姿势

2. 容器设计
   - 多种预设容器类型（水晶球、展示盒等）
   - 自定义容器选项
   - 设置容器材质和颜色
   - 添加标签文字和样式

3. 场景设置
   - 场景背景选择
   - 环境氛围设置
   - 光照效果调整

4. 图像风格
   - 选择渲染风格
   - 调整图像质量
   - 设置特殊效果

## 技术栈

- 前端：
  - HTML5
  - Tailwind CSS
  - JavaScript
  - Font Awesome图标

- 后端：
  - Python
  - Flask
  - Flask-SocketIO
  - Flask-CORS

## 运行环境

- Python 3.x
- 现代浏览器（支持HTML5和WebSocket）

## 安装和运行

1. 安装后端依赖：
```bash
cd backend
pip install -r requirements.txt
```

2. 启动后端服务器：
```bash
python app.py
```

3. 在浏览器中打开前端页面：
```bash
cd frontend
# 使用本地服务器打开index.html
```

## 注意事项

- 确保后端服务器在运行状态
- 浏览器需要启用JavaScript
- 建议使用现代浏览器以获得最佳体验 