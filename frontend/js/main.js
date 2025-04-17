
/* starter_pack_prompt_creator/frontend/js/main.js */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子效果
    initParticles();
    
    // 初始化本地存储
    if (!localStorage.getItem('promptHistory')) {
        localStorage.setItem('promptHistory', JSON.stringify([]));
    }

    // 初始化交互元素
    initTabInteraction();
    initContainerSelector();
    initCharacterStyleSelector();
    initFormSubmission();
    initCopyButton();
    initSaveButton();
    
    // 加载历史记录
    loadHistory();
});

// 初始化粒子特效
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#3b82f6" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#3b82f6", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" }
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            }
        });
    }
}

// 初始化选项卡交互
function initTabInteraction() {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 切换按钮状态
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // 切换内容状态
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// 初始化容器选择器
function initContainerSelector() {
    document.querySelectorAll('.container-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.container-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            
            const value = this.getAttribute('data-value');
            document.getElementById('container').value = value;
            
            const customContainer = document.getElementById('customContainer');
            if (value === 'custom') {
                customContainer.classList.remove('hidden');
            } else {
                customContainer.classList.add('hidden');
            }
        });
    });
}

// 初始化角色风格选择器
function initCharacterStyleSelector() {
    document.getElementById('characterStyle').addEventListener('change', function() {
        const customCharacterStyle = document.getElementById('customCharacterStyle');
        if (this.value === 'custom') {
            customCharacterStyle.classList.remove('hidden');
        } else {
            customCharacterStyle.classList.add('hidden');
        }
    });
}

// 初始化表单提交
function initFormSubmission() {
    document.getElementById('promptForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // 生成提示词
        const prompt = generatePrompt(data);
        
        // 显示结果
        document.getElementById('generatedPrompt').textContent = prompt;
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.classList.remove('hidden');
        
        // 设置链接
        document.getElementById('gptLink').href = `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`;
        document.getElementById('midjourneyLink').href = `https://discord.com/channels/@me?draft=${encodeURIComponent('/imagine ' + prompt)}`;
        
        // 滚动到结果
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    });
}

// 初始化复制按钮
function initCopyButton() {
    document.getElementById('copyBtn').addEventListener('click', function() {
        const prompt = document.getElementById('generatedPrompt').textContent;
        navigator.clipboard.writeText(prompt).then(() => {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check mr-2"></i>Copy';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });
}

// 初始化保存按钮
function initSaveButton() {
    document.getElementById('saveBtn').addEventListener('click', function() {
        const prompt = document.getElementById('generatedPrompt').textContent;
        saveToHistory(prompt);
        
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check mr-2"></i>已保存';
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
}

// 生成提示词函数
function generatePrompt(data) {
    // 基础提示词介绍
    let prompt = `Create a highly detailed image of a collectible figurine in a "starter pack" packaging. 
The result should resemble a real-world product with physical packaging, styled as a premium studio rendering. The box is fully displayed on the screen.

All elements — the figure, accessories, and diorama — should appear in a solid, collectible 3D figure style with hard or matte plastic textures, visible seams, and toy-like physical presence.

`;
    
    // 容器部分
    prompt += `The figure is encased in a ${data.container === 'custom' ? data.customContainer : data.container} display`;
    
    if (data.containerMaterial) {
        prompt += ` made of ${data.containerMaterial}`;
    }
    
    if (data.containerColor) {
        prompt += `, with background design of ${data.containerColor}`;
    }
    
    if (data.containerLabel) {
        prompt += `, and a title label`;
        
        if (data.labelColor) {
            prompt += ` in ${data.labelColor}`;
        } else {
            prompt += ` in silver capitals`;
        }
        
        prompt += ` reading "${data.containerLabel}"`;
    }
    
    prompt += `.\n\n`;
    
    // 角色部分
    const characterStyle = data.characterStyle === 'custom' ? data.customCharacterStyle : data.characterStyle;
    prompt += `The character is styled as a ${characterStyle}`;
    
    if (data.characterName) {
        prompt += ` named "${data.characterName}"`;
    }
    
    if (data.clothingDescription) {
        prompt += `, wearing ${data.clothingDescription}`;
    }
    
    if (data.characterPose) {
        prompt += `, posed ${data.characterPose}`;
    }
    
    prompt += `.\n\n`;
    
    // 配件部分
    if (data.accessories) {
        prompt += `Accessories displayed include: ${data.accessories}.\n\n`;
    }
    
    // 场景部分
    if (data.displayEnvironment) {
        prompt += `The container is placed ${data.displayEnvironment}`;
        
        if (data.backgroundScene) {
            prompt += `, with ${data.backgroundScene} in the background`;
        }
        
        prompt += `.\n\n`;
    }
    
    if (data.dioramaElements) {
        prompt += `Inside the container is a miniature diorama featuring: ${data.dioramaElements}.\n\n`;
    }
    
    if (data.environmentalEffects) {
        prompt += `Environmental effects: ${data.environmentalEffects}.\n\n`;
    }
    
    // 图像风格部分
    if (data.lighting || data.cameraAngle || data.renderStyle || data.imageSize) {
        prompt += `Image specifications: `;
        
        if (data.lighting) {
            prompt += `lighting is ${data.lighting}`;
            
            if (data.cameraAngle || data.renderStyle || data.imageSize) {
                prompt += `, `;
            } else {
                prompt += `. `;
            }
        }
        
        if (data.cameraAngle) {
            prompt += `the scene is captured from a ${data.cameraAngle} angle`;
            
            if (data.renderStyle || data.imageSize) {
                prompt += `, `;
            } else {
                prompt += `. `;
            }
        }
        
        if (data.renderStyle) {
            prompt += `rendered in ${data.renderStyle} style`;
            
            if (data.imageSize) {
                prompt += `, `;
            } else {
                prompt += `. `;
            }
        }
        
        if (data.imageSize) {
            prompt += `in ${data.imageSize}`;
        }
        
        prompt += `.\n\n`;
    }
    
    // 附加细节
    if (data.additionalNotes) {
        prompt += `Additional notes: ${data.additionalNotes}`;
    }
    
    return prompt;
}

// 保存到历史记录
function saveToHistory(prompt) {
    const history = JSON.parse(localStorage.getItem('promptHistory') || '[]');
    history.unshift({
        prompt: prompt,
        timestamp: new Date().toISOString()
    });
    
    // 限制最多保存10条记录
    if (history.length > 10) {
        history.pop();
    }
    
    localStorage.setItem('promptHistory', JSON.stringify(history));
}

// 加载历史记录
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('promptHistory') || '[]');
    
    // 这里可以实现从历史记录加载上一次的配置的功能
    // 暂时先在控制台输出历史记录，以备后续扩展
    console.log('已加载提示词历史记录:', history);
}
