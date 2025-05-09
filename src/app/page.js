'use client'; // 声明这是一个客户端组件，表示此代码将会在浏览器端执行，而不是服务器端

// 导入必要的模块和组件
import { useState, useEffect } from "react"; // React的useState Hook，用于在函数组件中管理状态
import TaskList from "../components/TaskList"; // 导入自定义的TaskList组件，用于显示任务列表

/**
 * Home组件：任务管理应用的主页
 * 功能：
 * 1. 允许用户输入新任务
 * 2. 管理任务列表状态
 * 3. 显示所有已添加的任务
 */
export default function Home() {
  // 状态管理
  const [tasks, setTasks] = useState([]); // 初始化空任务数组，用于存储所有任务
  const [newTask, setNewTask] = useState(''); // 初始化空字符串，用于存储输入框中的新任务内容
  const [nextId, setNextId] = useState(1); // 状态保存下一个任务ID

  // 读取本地存储的任务
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []; // 从localStorage获取任务列表
    setTasks(savedTasks); // 设置任务列表
    const maxId = savedTasks.reduce((max, task) => Math.max(max, task.id), 0); // 获取最大ID
    setNextId(maxId + 1); // 更新下一个ID
  }, []);          

  /**
   * addTask函数：处理添加新任务的逻辑
   * 步骤：
   * 1. 记录当前任务列表状态
   * 2. 将新任务添加到列表中
   * 3. 更新状态
   * 4. 清空输入框
   */
  const addTask = () => {
    if (!newTask.trim()) return; // 如果任务内容为空，则不添加

    console.log("Before:", tasks); // 输出添加前的任务列表，用于调试
    console.log("NewTask:", newTask); // 输出要添加的新任务内容

    const newTaskObj = {
      id: nextId,        // 使用下一个ID
      description: newTask, // 新任务描述
    };

    const updatedTasks = [...tasks, newTaskObj]; // 使用展开运算符创建新数组，保持原数组不变
    setTasks(updatedTasks); // 更新任务列表
    console.log("After:", updatedTasks); // 输出更新后的任务列表，用于确认更新成功

    setNewTask(''); // 重置输入框为空，准备下一次输入
    setNextId(nextId + 1); // 更新下一个ID
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // 更新本地存储
  };

  // 处理删除任务
  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // 过滤掉要删除的任务
    setTasks(updatedTasks); // 更新任务列表
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // 更新本地存储
  };

  // 返回组件的JSX结构
  return (
    // main容器：整个应用的主要区域
    <main className="p-4 max-w-md mx-auto"> {/* 设置内边距为4个单位 */}
      {/* 页面标题 */}
      <h1 className="text-2xl font-bold">Task Board</h1>

      {/* 任务输入区域：包含输入框和添加按钮 */}
      <div className="flex gap-2 mb-4"> {/* 使用flex布局，设置间距和下边距 */}
        {/* 任务输入框 */}
        <input
          className="border p-2 flex-1" // 设置边框、内边距，并占用剩余空间
          placeholder="Enter a task" // 提示文本
          value={newTask} // 将输入框的值与newTask状态绑定
          onChange={(e) => setNewTask(e.target.value)} // 当输入内容改变时更新newTask状态
        />
        {/* 添加任务按钮 */}
        <button
          className="bg-blue-500 text-white px-4" // 设置蓝色背景、白色文字和水平内边距
          onClick={addTask} // 点击时触发addTask函数
        >Add</button>
      </div>

      {/* 任务列表区域 */}
      <TaskList tasks={tasks} onDelete={handleDelete} /> {/* 将任务数组和删除函数传递给TaskList组件 */}
    </main>
  );
}
