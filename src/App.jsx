import React, { useState, useEffect, useRef } from 'react';

// --- 图标组件 (Icons) ---
const IconPlus = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
const IconMinus = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/></svg>
);
const IconEdit = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
);
const IconFolder = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
);
const IconSettings = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);
const IconTerminal = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
);
const IconCheck = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
);
const IconLink = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
);
const IconLoader = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className}`}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
);
const IconX = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const IconTrash = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
);
const IconClock = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const IconLayers = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
);
const IconImage = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);
const IconType = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>
);
const IconRepeat = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
);
const IconScript = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
);
const IconCopy = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);


export default function App() {
  // --- 全局配置 ---
  const [config, setConfig] = useState({
    baseUrl: 'http://localhost:8000/v1/chat/completions',
    apiKey: 'han1234',
    maxConcurrent: 3, 
    taskInterval: 1.0, 
  });

    // --- 项目管理状态 ---
    // 初始设为空，启动时从 localStorage 恢复（或回退到示例项目）
    const [projects, setProjects] = useState([]);
    const [activeProjectId, setActiveProjectId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editName, setEditName] = useState('');

  // --- 当前项目输入状态 ---
    const [activeProject, setActiveProject] = useState(null);
  const [orientation, setOrientation] = useState('portrait');
  const [duration, setDuration] = useState('15s');
  const [modelName, setModelName] = useState('sora-video-portrait-15s');
  const [generationType, setGenerationType] = useState('image'); 

  // --- 批量生成状态 ---
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchMode, setBatchMode] = useState('script'); 
  const [batchScripts, setBatchScripts] = useState(['']);
  const [repeatCount, setRepeatCount] = useState(5);
  
  // --- App 状态 ---
  const [showDebug, setShowDebug] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [queue, setQueue] = useState([]);
  const [logs, setLogs] = useState([]);
  const [curlPreview, setCurlPreview] = useState('');
  
  // --- 交互状态 (Toast, Tooltip) ---
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);

  // --- 调度器状态 ---
  const logsEndRef = useRef(null);
  const batchInputRef = useRef(null);
  const lastTaskStartTime = useRef(0);
    const projectsLoadedRef = useRef(false);
    const composingRef = useRef(false);
    const settingsLoadedRef = useRef(false);
    const queueLoadedRef = useRef(false);
  const [tick, setTick] = useState(0);
  const toastTimer = useRef(null);

  // --- 辅助函数：复制并显示 Toast ---
  const handleCopy = (text) => {
      if (!text) return;
      const strToCopy = typeof text === 'string' ? text : JSON.stringify(text);
      navigator.clipboard.writeText(strToCopy);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setToastVisible(true);
      toastTimer.current = setTimeout(() => setToastVisible(false), 1000);
  };

  // --- 效果钩子 ---

  useEffect(() => {
    const checkConnection = () => {
        if (window.electronAPI && typeof window.electronAPI.downloadVideo === 'function') {
            addLog("系统: 原生模块已成功连接。", "success");
        } else {
            addLog("系统: 未检测到原生模块，功能受限 (网页模式)。", "error");
        }
    };
    const timer = setTimeout(checkConnection, 500);
    return () => clearTimeout(timer);
  }, []);

    // 加载持久化设置与项目（仅使用 localStorage，避免覆盖）
    useEffect(() => {
        const loadPersisted = () => {
            let savedSettings = null;
            let savedProjects = null;

            try { const s = localStorage.getItem('sora2-settings'); savedSettings = s ? JSON.parse(s) : null; } catch (e) { console.error('read localStorage settings failed', e); }
            try { const p = localStorage.getItem('sora2-projects'); savedProjects = p ? JSON.parse(p) : null; } catch (e) { console.error('read localStorage projects failed', e); }

            if (savedSettings && typeof savedSettings === 'object') {
                // 恢复 config，并且尝试恢复 UI 相关状态
                setConfig(prev => ({ ...prev, ...savedSettings }));
                if (savedSettings.orientation) setOrientation(savedSettings.orientation);
                if (savedSettings.duration) setDuration(savedSettings.duration);
                if (savedSettings.generationType) setGenerationType(savedSettings.generationType);
                if (savedSettings.modelName) setModelName(savedSettings.modelName);
            }

            if (Array.isArray(savedProjects)) {
                if (savedProjects.length > 0) {
                    setProjects(savedProjects);
                    setActiveProjectId(savedProjects[0].id);
                }
            } else if (savedProjects && typeof savedProjects === 'object') {
                if (Array.isArray(savedProjects.projects) && savedProjects.projects.length > 0) {
                    setProjects(savedProjects.projects);
                    if (savedProjects.activeId) setActiveProjectId(savedProjects.activeId);
                    else setActiveProjectId(savedProjects.projects[0].id);
                }
            } else {
                // 未找到已保存的数据 -> 使用内置示例并设为已加载状态
                const sample = [{ id: 1, name: '示例项目 A', prompt: 'Product cinematic shot on a wooden table, 这是台词文案, 4k resolution.', image: null, imageName: null }];
                setProjects(sample);
                setActiveProjectId(sample[0].id);
            }

            // 恢复队列（如果存在）
            try {
                const q = localStorage.getItem('sora2-queue');
                const parsed = q ? JSON.parse(q) : null;
                if (Array.isArray(parsed)) {
                    const normalized = parsed.map(t => {
                        if (['GENERATING','STARTING','PROCESSING','CACHING'].includes(t.status)) {
                            return { ...t, status: 'PENDING', stage: '等待中', progress: 0 };
                        }
                        return t;
                    });
                    setQueue(normalized);
                }
            } catch (e) {
                console.error('read localStorage queue failed', e);
            }

            // 延迟标记为已加载，确保上面通过 setState 的更新先被 React 应用，
            // 再开启自动持久化，避免用旧的默认值覆盖本地存储。
            setTimeout(() => {
                projectsLoadedRef.current = true;
                settingsLoadedRef.current = true;
                queueLoadedRef.current = true;
            }, 0);
        };
        loadPersisted();
    }, []);

    // 当项目或选中项目改变时持久化保存（仅 localStorage），但在初始加载完成之前不保存以免覆盖
    useEffect(() => {
        if (!projectsLoadedRef.current) return;
        const payload = { projects, activeId: activeProjectId };
        try {
            localStorage.setItem('sora2-projects', JSON.stringify(payload));
            addLog('系统: 项目已保存到 localStorage。', 'success');
        } catch (e) {
            addLog('系统: 保存到 localStorage 失败。', 'error');
        }
    }, [projects, activeProjectId]);

    // 当生产队列改变时持久化（恢复后才保存），刷新时将未完成任务标记为 PENDING 以便恢复处理
    useEffect(() => {
        if (!queueLoadedRef.current) return;
        try {
            localStorage.setItem('sora2-queue', JSON.stringify(queue));
            addLog('系统: 队列已保存到 localStorage。', 'success');
        } catch (e) {
            addLog('系统: 保存队列到 localStorage 失败。', 'error');
        }
    }, [queue]);

    // 持久化 UI 设置（合并到 sora2-settings）
    useEffect(() => {
        if (!settingsLoadedRef.current) return;
        const persistSettings = () => {
            try {
                const raw = localStorage.getItem('sora2-settings');
                const base = raw ? JSON.parse(raw) : {};
                const toSave = { ...base, ...config, orientation, duration, generationType, modelName };
                localStorage.setItem('sora2-settings', JSON.stringify(toSave));
            } catch (e) {
                console.error('persist settings failed', e);
            }
        };
        persistSettings();
    }, [config, orientation, duration, generationType, modelName]);

    // helper: 立即保存 projects 到 localStorage（在关键操作后调用以保证数据不丢失）
    const saveProjectsToLocalStorage = (projectsToSave, activeIdToSave) => {
        try {
            const payload = { projects: projectsToSave, activeId: activeIdToSave };
            localStorage.setItem('sora2-projects', JSON.stringify(payload));
            addLog('系统: 项目已保存到 localStorage。', 'success');
            projectsLoadedRef.current = true;
        } catch (e) {
            addLog('系统: 保存到 localStorage 失败。', 'error');
        }
    };

    const handleSaveSettings = async () => {
        const toSave = { ...config, orientation, duration, generationType, modelName };
        if (window.electronAPI && typeof window.electronAPI.saveSettings === 'function') {
            try {
                await window.electronAPI.saveSettings(toSave);
                addLog('系统: 设置已保存到用户数据目录。', 'success');
            } catch (e) {
                addLog('系统: 保存设置失败。', 'error');
            }
        } else {
            try {
                localStorage.setItem('sora2-settings', JSON.stringify(toSave));
                addLog('系统: 设置已保存到 localStorage。', 'success');
            } catch (e) {
                addLog('系统: 保存到 localStorage 失败。', 'error');
            }
        }
        settingsLoadedRef.current = true;
        setShowSettings(false);
    };

  useEffect(() => {
    const runningCount = queue.filter(t => t.status === 'GENERATING' || t.status === 'STARTING' || t.status === 'PROCESSING' || t.status === 'CACHING').length;
    const pendingTasks = queue.filter(t => t.status === 'PENDING');

    if (runningCount < parseInt(config.maxConcurrent) && pendingTasks.length > 0) {
        const now = Date.now();
        const intervalMs = (parseFloat(config.taskInterval) || 1.0) * 1000;
        const timeSinceLastStart = now - lastTaskStartTime.current;
        
        if (timeSinceLastStart < intervalMs) {
            const delay = intervalMs - timeSinceLastStart;
            const timerId = setTimeout(() => setTick(t => t + 1), delay);
            return () => clearTimeout(timerId);
        }

        const nextTask = pendingTasks[pendingTasks.length - 1]; 
        if (nextTask) {
            lastTaskStartTime.current = Date.now();
            updateTask(nextTask.id, { status: 'STARTING', stage: '准备发射' });
            processTask(nextTask.id, nextTask.prompt, nextTask.image, nextTask.generationType);
        }
    }
  }, [queue, config.maxConcurrent, config.taskInterval, tick]);

  useEffect(() => {
      const proj = projects.find(p => p.id === activeProjectId);
      if (proj && !composingRef.current) setActiveProject(proj);
  }, [activeProjectId, projects]);

  useEffect(() => {
    const newModelName = `sora-video-${orientation}-${duration}`;
    setModelName(newModelName);
  }, [orientation, duration]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    if (!activeProject) return;
    let previewPrompt = String(activeProject.prompt || '');
    if (previewPrompt.includes('台词文案')) {
        previewPrompt = previewPrompt.replace('这是台词文案', '[台词文案]');
    }
    const content = generationType === 'text'
        ? previewPrompt
        : [{ type: "text", text: previewPrompt }, { type: "image_url", image_url: { url: activeProject.image || "data:image/..." } }];
    const payload = {
        model: modelName,
        messages: [{ role: "user", content: content }],
        stream: true
    };
    const previewJson = JSON.parse(JSON.stringify(payload));
    if (generationType === 'image' && Array.isArray(previewJson.messages[0].content)) {
        if (previewJson.messages[0].content[1].image_url.url.length > 100) {
            previewJson.messages[0].content[1].image_url.url = "data:image/...[已截断]";
        }
    }
    const cmd = `curl -X POST "${config.baseUrl}" \\\n  -H "Authorization: Bearer ${config.apiKey}" \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(previewJson, null, 2)}'`;
    setCurlPreview(cmd);
  }, [config, activeProject, modelName, generationType]);

  // --- 处理器 ---

  const handleCreateProject = () => {
      const newId = Date.now();
      const newProject = { id: newId, name: `新项目 ${projects.length + 1}`, prompt: '', image: null, imageName: null };
      const newProjects = [...projects, newProject];
      setProjects(newProjects);
      setActiveProjectId(newId);
      saveProjectsToLocalStorage(newProjects, newId);
  };

  const handleDeleteProject = (e, id) => {
      e.stopPropagation();
      if (projects.length <= 1) return; 
      const newProjects = projects.filter(p => p.id !== id);
      const newActiveId = activeProjectId === id ? newProjects[0].id : activeProjectId;
      setProjects(newProjects);
      setActiveProjectId(newActiveId);
      saveProjectsToLocalStorage(newProjects, newActiveId);
  };

  const startRenaming = (e, project) => {
      e.stopPropagation();
      setEditingProjectId(project.id);
      setEditName(project.name);
  };

  const saveRename = () => {
      if (!editName.trim()) return;
      if (composingRef.current) return; // 等待输入法组成结束
      const next = projects.map(p => p.id === editingProjectId ? { ...p, name: editName } : p);
      setProjects(next);
      saveProjectsToLocalStorage(next, activeProjectId);
      setEditingProjectId(null);
  };

  const updateActiveProject = (field, value) => {
      // 先更新本地 activeProject，以便输入时立即响应
      setActiveProject(prev => prev ? { ...prev, [field]: value } : prev);
      // 在输入法组合期间不要触发全局 projects 更新，防止覆盖并中断 IME
      if (composingRef.current) return;
      const next = projects.map(p => p.id === activeProjectId ? { ...p, [field]: value } : p);
      setProjects(next);
      saveProjectsToLocalStorage(next, activeProjectId);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
                setProjects(prev => {
                    const next = prev.map(p => p.id === activeProjectId ? { ...p, image: reader.result, imageName: file.name } : p);
                    saveProjectsToLocalStorage(next, activeProjectId);
                    return next;
                });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScriptChange = (index, value) => {
      const newScripts = [...batchScripts];
      newScripts[index] = value;
      if (index === newScripts.length - 1 && value !== '') {
          newScripts.push('');
      }
      setBatchScripts(newScripts);
  };

  const handleOpenBatchModal = () => {
      if (generationType === 'image' && !activeProject.image) {
          addLog("错误: 图生视频模式下必须上传项目图片。", 'error');
          return;
      }
      setShowBatchModal(true);
  };

  const handleBatchAddToQueue = () => {
      if (batchMode === 'script') {
          const validScripts = batchScripts.filter(s => s.trim() !== '');
          if (validScripts.length === 0) return;
          validScripts.forEach((script) => {
              let finalPrompt = String(activeProject.prompt || '');
              if (finalPrompt.includes('这是台词文案')) {
                  finalPrompt = finalPrompt.replace('这是台词文案', script);
              } else {
                  finalPrompt = `${finalPrompt} ${script}`;
              }
              addToQueue(finalPrompt, script);
          });
      } else {
          const count = parseInt(repeatCount) || 1;
          for(let i=0; i<count; i++) {
              addToQueue(String(activeProject.prompt || ''), `重复任务 #${i + 1}`);
          }
      }
      setShowBatchModal(false);
      if (batchMode === 'script') setBatchScripts(['']);
  };
  
  const addToQueue = (prompt, scriptSnippet) => {
      const newTaskId = Date.now() + Math.random(); 
      const newTask = {
          id: newTaskId,
          projectId: activeProjectId,
          projectName: activeProject?.name,
          prompt: String(prompt),
          scriptSnippet: String(scriptSnippet), 
          status: 'PENDING',
          stage: '等待中',
          progress: 0,
          videoUrl: null,
          errorMessage: null,
          streamLog: '', 
          warning: null, 
          timestamp: new Date().toLocaleString(),
          modelUsed: modelName,
          image: activeProject.image,
          generationType: generationType, 
      };
      setQueue(prev => [newTask, ...prev]);
  };

  const addLog = (msg, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { time, msg, type }]);
  };

  const updateTask = (id, updates) => {
      setQueue(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const triggerDownload = (url, taskId) => {
    const filename = `sora_task_${taskId}.mp4`;
    if (window.electronAPI && typeof window.electronAPI.downloadVideo === 'function') {
        window.electronAPI.downloadVideo(url, filename);
        addLog(`[任务 ${taskId}] 已触发原生下载。`, 'success');
    }
  };

  const processTask = async (taskId, taskPrompt, taskImage, taskType) => {
      updateTask(taskId, { status: 'GENERATING', stage: '初始化中', progress: 0 });
      let hasReceivedData = false;

      try {
          const content = taskType === 'text'
              ? String(taskPrompt)
              : [{ type: "text", text: String(taskPrompt) }, { type: "image_url", image_url: { url: taskImage } }];
          const payload = { model: modelName, messages: [{ role: "user", content: content }], stream: true };
          const response = await fetch(config.baseUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.apiKey}` },
              body: JSON.stringify(payload)
          });
          if (!response.ok) {
              let errorMsg = `HTTP ${response.status}`;
              try { const errorText = await response.text(); if (errorText) errorMsg = errorText; } catch (e) { }
              throw new Error(errorMsg);
          }
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = ""; 
          let accumulatedContent = "";

          while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop(); 

              for (const line of lines) {
                  const trimmed = line.trim();
                  if (!trimmed || trimmed === 'data: [DONE]') continue;
                  if (trimmed.startsWith('data: ')) {
                      try {
                          const jsonStr = trimmed.replace('data: ', '');
                          const data = JSON.parse(jsonStr);
                          if (data.error) throw new Error(data.error.message || "API Error");
                          const delta = data.choices?.[0]?.delta;
                          const combinedChunk = (delta?.content || "") + (delta?.reasoning_content || "");
                          
                          if (combinedChunk) {
                              accumulatedContent += combinedChunk;
                              const updates = { streamLog: accumulatedContent.length > 1000 ? '...' + accumulatedContent.slice(-1000) : accumulatedContent };

                              if (!hasReceivedData) {
                                  hasReceivedData = true;
                                  addLog(`[任务 ${taskId}] 开始接收数据流...`, 'info');
                                  updates.stage = '准备中';
                              }
                              
                              // --- 细分状态检测逻辑 ---
                              // 1. 违规检测
                              if (accumulatedContent.includes("Content Policy Violation") || accumulatedContent.includes("content_violation")) {
                                  throw new Error("检测到内容违规 (Policy Violation)");
                              }
                              // 2. 超时检测
                              if (accumulatedContent.includes("Generation timeout") || accumulatedContent.includes("timed out")) {
                                  throw new Error("生成超时 (Generation Timeout)");
                              }
                              // 3. 降级检测 (警告)
                              if (accumulatedContent.includes("Falling back to normal video")) {
                                  updates.warning = "去水印失败";
                              }
                              // 4. 去水印模式 (逻辑修正：移除 selection-tag)
                              if (accumulatedContent.includes("Watermark-free mode") || accumulatedContent.includes("Publishing video")) {
                                  updates.stage = '去水印中';
                                  updates.status = 'PROCESSING';
                              }
                              // 5. 缓存/同步中
                              if (accumulatedContent.includes("caching") || accumulatedContent.includes("Preparing final response")) {
                                  updates.stage = '同步中';
                                  updates.status = 'CACHING';
                              }
                              // 6. 图片心跳检测
                              if (accumulatedContent.includes("Image generation in progress")) {
                                  updates.stage = '图片生成中';
                              }
                              
                              // 7. 进度解析 (仅在普通渲染阶段更新)
                              const progressMatch = accumulatedContent.match(/Video Generation Progress\D*(\d+)%/gi);
                              if (progressMatch && !accumulatedContent.includes("Watermark-free mode")) {
                                  const lastMatch = progressMatch[progressMatch.length - 1];
                                  const pVal = parseInt(lastMatch.match(/\d+/)[0], 10);
                                  if (!isNaN(pVal)) {
                                      updates.progress = pVal;
                                      updates.stage = '生成中';
                                      updates.status = 'GENERATING';
                                  }
                              }

                              updateTask(taskId, updates);

                              const srcMatch = combinedChunk.match(/src=['"]([^'"]+?)['"]/);
                              const urlMatch = combinedChunk.match(/(https?:\/\/[^\s)"]+)/);
                              let foundUrl = srcMatch ? srcMatch[1] : (urlMatch && !combinedChunk.includes("<") ? urlMatch[0] : null);

                              if (foundUrl) {
                                  updateTask(taskId, { status: 'COMPLETED', stage: '已完成', progress: 100, videoUrl: foundUrl });
                                  triggerDownload(foundUrl, taskId);
                              }
                          }
                      } catch (e) {
                          if (e.message.includes("内容违规") || e.message.includes("超时")) throw e;
                      }
                  }
              }
          }
      } catch (err) {
          addLog(`[任务 ${taskId}] 异常: ${err.message}`, 'error');
          let finalStage = '错误';
          if (err.message.includes("违规")) finalStage = '内容违规';
          if (err.message.includes("超时")) finalStage = '超时';
          updateTask(taskId, { status: 'FAILED', stage: finalStage, progress: 0, errorMessage: err.message });
      }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden relative">
      <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 z-10 shrink-0 shadow-sm">
          <div className="flex items-center gap-6">
              <h1 className="text-gray-900 font-bold text-lg tracking-wide flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div> Sora 视频生成
              </h1>
          </div>
          <div className="flex items-center gap-3">
              <button onClick={() => setShowDebug(!showDebug)} className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${showDebug ? 'bg-gray-100 text-green-600' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}><IconTerminal size={14} /> 日志</button>
              <button onClick={() => setShowSettings(true)} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="设置"><IconSettings size={20} /></button>
          </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col shrink-0">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-gray-700 font-bold tracking-wide flex items-center gap-2 text-sm uppercase">项目列表</h2>
                <button onClick={handleCreateProject} className="text-gray-500 hover:text-blue-600 transition-colors bg-white border border-gray-200 p-1 rounded shadow-sm hover:shadow"><IconPlus size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {projects.map(proj => (
                    <div key={proj.id} onClick={() => setActiveProjectId(proj.id)} className={`group flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors border ${activeProjectId === proj.id ? 'bg-white border-gray-200 shadow-sm text-blue-600' : 'border-transparent text-gray-600 hover:bg-gray-100'}`}>
                        <IconFolder size={16} className={activeProjectId === proj.id ? 'text-blue-400' : 'text-gray-600'} />
                        {editingProjectId === proj.id ? (
                            <input autoFocus value={editName} onChange={(e) => setEditName(e.target.value)} onBlur={saveRename} onKeyDown={(e) => e.key === 'Enter' && saveRename()} onCompositionStart={() => composingRef.current = true} onCompositionEnd={() => composingRef.current = false} className="bg-white border border-blue-500 rounded px-1 py-0.5 text-xs text-gray-900 w-full outline-none" />
                        ) : (
                            <span className="text-sm font-medium truncate flex-1">{String(proj.name || '')}</span>
                        )}
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => startRenaming(e, proj)} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-white rounded"><IconEdit size={12} /></button>
                            <button onClick={(e) => handleDeleteProject(e, proj.id)} className="p-1 text-gray-400 hover:text-red-500 hover:bg-white rounded"><IconTrash size={12} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </aside>

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-white">
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
                <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">{String(activeProject?.name || '')}<span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded">项目配置</span></h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="flex items-center gap-2 mb-2">
                                <button onClick={() => setGenerationType('image')} className={`px-3 py-1.5 text-sm font-medium rounded transition-colors flex items-center gap-2 border ${generationType === 'image' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}><IconImage size={16} /> 图生视频</button>
                                <button onClick={() => setGenerationType('text')} className={`px-3 py-1.5 text-sm font-medium rounded transition-colors flex items-center gap-2 border ${generationType === 'text' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}><IconType size={16} /> 文生视频</button>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex justify-between">总提示词 (Master Prompt)<span className="text-xs text-blue-600 normal-case bg-blue-50 px-2 py-0.5 rounded">使用 "这是台词文案" 作为占位符</span></label>
                                <textarea value={String(activeProject?.prompt || '')} onChange={(e) => updateActiveProject('prompt', e.target.value)} onCompositionStart={() => composingRef.current = true} onCompositionEnd={(e) => { composingRef.current = false; updateActiveProject('prompt', e.target.value); }} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none min-h-[140px] font-mono text-sm leading-relaxed" placeholder="例如：一个精美的咖啡杯，这是台词文案，4k分辨率..." />
                            </div>
                            {generationType === 'image' && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">项目图片</label>
                                    <div className="relative group">
                                        <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                        <div className={`h-40 rounded-lg border-2 border-dashed flex items-center justify-center transition-colors ${activeProject?.image ? 'border-blue-500/50 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                                            {activeProject?.image ? (
                                                <div className="flex items-center gap-4">
                                                    <img src={String(activeProject.image)} alt="preview" className="h-32 rounded object-cover border border-gray-200 shadow-sm" />
                                                    <div className="text-left">
                                                        <div className="text-sm text-green-600 font-medium flex items-center gap-2"><IconCheck size={14} /> 已上传</div>
                                                        <div className="text-xs text-gray-500 mt-1 max-w-[200px] truncate">{String(activeProject.imageName || '')}</div>
                                                        <div className="text-xs text-blue-500 mt-1 cursor-pointer hover:underline">点击替换</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center text-gray-400"><IconPlus size={24} className="mx-auto mb-2 text-gray-300"/><span className="text-sm font-medium">点击上传项目图片</span></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="lg:col-span-4 flex flex-col gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">画面方向</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => setOrientation('landscape')} className={`px-3 py-2.5 rounded-lg text-sm border font-medium transition-all ${orientation === 'landscape' ? 'bg-white border-blue-500 text-blue-600 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>横屏</button>
                                    <button onClick={() => setOrientation('portrait')} className={`px-3 py-2.5 rounded-lg text-sm border font-medium transition-all ${orientation === 'portrait' ? 'bg-white border-blue-500 text-blue-600 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>竖屏</button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">时长</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => setDuration('10s')} className={`px-3 py-2.5 rounded-lg text-sm border font-medium transition-all ${duration === '10s' ? 'bg-white border-blue-500 text-blue-600 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>10秒</button>
                                    <button onClick={() => setDuration('15s')} className={`px-3 py-2.5 rounded-lg text-sm border font-medium transition-all ${duration === '15s' ? 'bg-white border-blue-500 text-blue-600 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>15秒</button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">当前模型</label>
                                <div className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 font-mono flex items-center gap-2 shadow-sm"><IconLink size={14} className="text-gray-400"/>{String(modelName)}</div>
                            </div>
                            <div className="flex-1"></div>
                            <div className="flex bg-gray-100 p-1 rounded-lg mb-2">
                                <button onClick={() => setBatchMode('script')} className={`flex-1 py-1.5 text-xs font-medium rounded-md flex items-center justify-center gap-1.5 transition-all ${batchMode === 'script' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><IconScript size={14} /> 台词模式</button>
                                <button onClick={() => setBatchMode('repeat')} className={`flex-1 py-1.5 text-xs font-medium rounded-md flex items-center justify-center gap-1.5 transition-all ${batchMode === 'repeat' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><IconRepeat size={14} /> 重复模式</button>
                            </div>
                            <button onClick={handleOpenBatchModal} className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-sm"><IconCopy size={18} />批量生成</button>
                        </div>
                    </div>
                </section>

                <section className="flex-1 pb-20">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h2 className="text-lg font-bold text-gray-900">生产队列</h2>
                        <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{queue.filter(t => t.projectId === activeProjectId).length} 个任务</span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm min-h-[200px]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50">
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase w-32 tracking-wider">缩略图</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">详情 (项目与文案)</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase w-48 tracking-wider">状态</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {queue.filter(t => t.projectId === activeProjectId).map((task) => (
                                        <tr key={task.id} className="group hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <div className="w-24 h-14 bg-gray-100 rounded border border-gray-200 flex items-center justify-center overflow-hidden relative shadow-sm">
                                                    {task.status === 'COMPLETED' && task.videoUrl ? (
                                                        <video src={String(task.videoUrl)} className="w-full h-full object-cover" muted onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
                                                    ) : (
                                                        <div className="flex flex-col items-center gap-1">
                                                            {(task.status === 'GENERATING' || task.status === 'STARTING' || task.status === 'PROCESSING' || task.status === 'CACHING') && <IconLoader className="text-blue-500" />}
                                                            <span className="text-[10px] text-gray-500 font-bold">{String(task.stage || '')}</span>
                                                        </div>
                                                    )}
                                                    {(task.status === 'GENERATING' || task.status === 'STARTING') && (
                                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                                                            <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${task.progress}%` }}></div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 cursor-pointer hover:bg-gray-100 transition-colors relative" onMouseEnter={(e) => setActiveTooltip({ taskId: task.id, type: 'prompt', rect: e.currentTarget.getBoundingClientRect(), title: '完整提示词' })} onMouseLeave={() => setActiveTooltip(null)} onClick={() => handleCopy(task.prompt)}>
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-xs font-bold text-blue-600 uppercase bg-blue-50 w-fit px-1.5 py-0.5 rounded">{String(task.projectName || '')}</div>
                                                    <div className="text-sm text-gray-800 font-medium line-clamp-3 leading-relaxed" title="点击复制完整内容">{String(task.prompt || '')}</div>
                                                    <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                                                        <span className={`px-1 py-0.5 rounded ${task.generationType === 'text' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>{task.generationType === 'text' ? '文生视频' : '图生视频'}</span>
                                                        {task.scriptSnippet && !String(task.scriptSnippet).startsWith("重复任务") && <span className="truncate max-w-[200px]">台词: "{String(task.scriptSnippet)}"</span>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4"
                                                onMouseEnter={(e) => {
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    if (task.status === 'FAILED' && task.errorMessage) setActiveTooltip({ taskId: task.id, type: 'error', rect, title: '错误详情' });
                                                    else if (task.status === 'GENERATING' || task.status === 'STARTING' || task.status === 'COMPLETED' || task.status === 'PROCESSING' || task.status === 'CACHING') setActiveTooltip({ taskId: task.id, type: 'log', rect, title: '实时响应' });
                                                }}
                                                onMouseLeave={() => setActiveTooltip(null)}
                                                onClick={() => { if (task.status === 'FAILED' && task.errorMessage) handleCopy(task.errorMessage); }}
                                                style={{ cursor: 'help' }}
                                            >
                                                <StatusBadge status={task.status} stage={task.stage} progress={task.progress} warning={task.warning} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </main>
      </div>

      {showBatchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
              <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
                  <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
                      <div><h3 className="font-bold text-gray-900 text-lg">{batchMode === 'script' ? '批量文案录入' : '重复生成设置'}</h3><p className="text-xs text-gray-500 mt-1">{batchMode === 'script' ? '每一行将生成一个独立的视频任务。' : '将重复生成当前提示词。'}</p></div>
                      <button onClick={() => setShowBatchModal(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-1 hover:bg-gray-100 rounded-full"><IconX size={20} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-8 bg-gray-50 flex flex-col items-center justify-center">
                      {batchMode === 'script' ? (
                          <div className="w-full space-y-3">
                              {batchScripts.map((script, idx) => (
                                  <div key={idx} className="flex gap-3 items-center animate-in slide-in-from-left-2 duration-300"><span className="text-xs font-mono text-gray-400 w-6 text-right">{idx + 1}.</span><input ref={idx === batchScripts.length - 1 ? batchInputRef : null} type="text" value={String(script)} placeholder={idx === batchScripts.length - 1 ? "输入新台词文案..." : ""} onChange={(e) => handleScriptChange(idx, e.target.value)} onCompositionStart={() => composingRef.current = true} onCompositionEnd={(e) => { composingRef.current = false; handleScriptChange(idx, e.target.value); }} className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-all shadow-sm" autoFocus={idx === batchScripts.length - 1} /></div>
                              ))}
                          </div>
                      ) : (
                          <div className="w-full max-w-sm space-y-6">
                              <div className="flex items-center justify-center gap-4"><button onClick={() => setRepeatCount(c => Math.max(1, c - 1))} className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm"><IconMinus size={20} /></button><div className="text-center"><input type="number" min="1" value={repeatCount} onChange={(e) => setRepeatCount(Math.max(1, parseInt(e.target.value) || 1))} className="text-5xl font-bold text-gray-800 bg-transparent w-32 text-center focus:outline-none" /><div className="text-xs text-gray-400 mt-1">次重复</div></div><button onClick={() => setRepeatCount(c => c + 1)} className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm"><IconPlus size={20} /></button></div>
                          </div>
                      )}
                  </div>
                  <div className="p-5 border-t border-gray-200 bg-white flex justify-end gap-3"><button onClick={() => setShowBatchModal(false)} className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg">取消</button><button onClick={handleBatchAddToQueue} className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-sm">添加任务</button></div>
              </div>
          </div>
      )}

      {showDebug && (
          <div className="h-48 border-t border-gray-200 bg-white p-0 flex flex-col absolute bottom-0 left-0 right-0 z-20 shadow-2xl">
              <div className="flex border-b border-gray-200"><div className="px-4 py-2 text-xs font-bold text-gray-600 border-r border-gray-200 bg-gray-50">系统日志</div><div className="flex-1 bg-gray-50 flex justify-end"><button onClick={() => setShowDebug(false)} className="px-4 hover:bg-gray-200 text-gray-500"><IconX size={14} /></button></div></div>
              <div className="flex-1 flex overflow-hidden">
                  <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1 bg-white">
                       {logs.map((log, i) => (<div key={i} className={`flex gap-2 ${log.type === 'error' ? 'text-red-600' : log.type === 'success' ? 'text-green-600' : 'text-gray-500'}`}><span className="opacity-50 select-none">[{String(log.time || '')}]</span><span>{String(log.msg || '')}</span></div>))}
                      <div ref={logsEndRef} />
                  </div>
                  <div className="w-1/3 p-4 overflow-y-auto bg-gray-50 border-l border-gray-200"><pre className="font-mono text-[10px] text-gray-600 whitespace-pre-wrap break-all">{String(curlPreview || '')}</pre></div>
              </div>
          </div>
      )}

      {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
              <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-md p-6 space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4"><h3 className="font-bold text-gray-900 text-lg">系统设置</h3><button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-900"><IconX size={20}/></button></div>
                  <div className="space-y-4">
                      <div className="space-y-2"><label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2"><IconLink size={12}/> API 地址 (Endpoint)</label><input type="text" value={String(config.baseUrl || '')} onChange={(e) => setConfig({...config, baseUrl: e.target.value})} onCompositionStart={() => composingRef.current = true} onCompositionEnd={(e) => { composingRef.current = false; setConfig({...config, baseUrl: e.target.value}); }} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-all" /></div>
                      <div className="space-y-2"><label className="text-xs font-semibold text-gray-500 uppercase">API 密钥 (Key)</label><input type="password" value={String(config.apiKey || '')} onChange={(e) => setConfig({...config, apiKey: e.target.value})} onCompositionStart={() => composingRef.current = true} onCompositionEnd={(e) => { composingRef.current = false; setConfig({...config, apiKey: e.target.value}); }} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-all" /></div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 space-y-4">
                      <div className="space-y-2"><label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2"><IconLayers size={12}/> 并发控制</label><input type="number" min="1" value={config.maxConcurrent} onChange={(e) => setConfig({...config, maxConcurrent: Math.max(1, parseInt(e.target.value) || 1)})} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500" /></div>
                      <div className="space-y-2"><label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2"><IconClock size={12}/> 提交间隔 (秒)</label><div className="flex items-center gap-3"><input type="number" min="0.1" step="0.1" value={config.taskInterval} onChange={(e) => setConfig({...config, taskInterval: Math.max(0.1, parseFloat(e.target.value) || 0.1)})} className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500" /><span className="text-xs text-gray-400 font-medium">S</span></div></div>
                  </div>
                  <div className="flex justify-end pt-2"><button onClick={handleSaveSettings} className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-sm transition-all">保存并关闭</button></div>
              </div>
          </div>
      )}

      {/* 智能悬浮窗 */}
      {activeTooltip && (() => {
          const task = queue.find(t => t.id === activeTooltip.taskId);
          if (!task) return null;
          let rawContent = activeTooltip.type === 'prompt' ? task.prompt : (activeTooltip.type === 'error' ? task.errorMessage : (task.streamLog || '等待数据...'));
          let contentText = String(rawContent || '');
          let titleColor = activeTooltip.type === 'error' ? 'text-red-500' : (activeTooltip.type === 'log' ? 'text-green-600' : 'text-gray-500');
          let positionStyle = activeTooltip.rect.left > window.innerWidth / 2 ? { right: window.innerWidth - activeTooltip.rect.right, left: 'auto' } : { left: activeTooltip.rect.left, right: 'auto' };
          if (activeTooltip.rect.bottom > window.innerHeight - 300) positionStyle.bottom = window.innerHeight - activeTooltip.rect.top + 10;
          else positionStyle.top = activeTooltip.rect.bottom + 10;

          return (<div className="fixed z-50 bg-white border border-gray-200 text-gray-800 text-xs rounded-lg p-4 shadow-xl max-w-[400px] pointer-events-none animate-in fade-in duration-150" style={positionStyle}><div className={`font-bold mb-1 uppercase text-[10px] tracking-wider flex justify-between items-center ${titleColor}`}><span>{String(activeTooltip.title || '')}</span>{(activeTooltip.type === 'error' || activeTooltip.type === 'prompt') && <span className="text-[9px] opacity-70 font-normal">(点击复制)</span>}</div><div className={`font-mono whitespace-pre-wrap leading-relaxed border-l-2 pl-2 border-gray-200`}>{contentText}</div></div>);
      })()}

      {toastVisible && <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-[60] animate-in fade-in zoom-in duration-200">已复制内容</div>}
    </div>
  );
}

const StatusBadge = ({ status, stage, progress, warning }) => {
    let styles = "bg-gray-100 text-gray-500 border-gray-200";
    let text = status;

    if (status === 'GENERATING' || status === 'STARTING') {
        return (
            <div className="flex flex-col gap-1 w-full max-w-[120px]">
                <div className="flex justify-between items-center text-[10px] text-blue-600 font-bold uppercase"><span>{String(stage || '')}</span><span>{String(progress || 0)}%</span></div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} /></div>
            </div>
        );
    }

    if (status === 'PROCESSING') {
        styles = "bg-indigo-50 text-indigo-600 border-indigo-200 animate-pulse";
        text = stage || "去水印中";
    } else if (status === 'CACHING') {
        styles = "bg-purple-50 text-purple-600 border-purple-200 animate-pulse";
        text = stage || "同步中";
    } else if (status === 'COMPLETED') {
        if (warning) {
            styles = "bg-yellow-50 text-yellow-600 border-yellow-200";
            text = warning;
        } else {
            styles = "bg-green-50 text-green-600 border-green-200";
            text = "已完成";
        }
    } else if (status === 'FAILED') {
        if (stage === '内容违规') {
            styles = "bg-orange-50 text-orange-600 border-orange-200";
            text = "内容违规";
        } else if (stage === '超时') {
            styles = "bg-slate-50 text-slate-600 border-slate-200";
            text = "超时";
        } else {
            styles = "bg-red-50 text-red-600 border-red-200";
            text = "失败";
        }
    } else {
        text = status === 'PENDING' ? '等待中' : status;
    }

    return <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${styles}`}>{String(text)}</span>;
};