'use client'; // 聲明這是一個客戶端組件，表示此代碼將在瀏覽器中執行，而不是伺服器端

// 導入必要的模組和組件
import Image from "next/image"; // Next.js的圖片組件，用於優化圖片載入
import { useState } from "react"; // React的useState Hook，用於在函數組件中管理狀態
import TaskList from "../components/TaskList"; // 導入自定義的TaskList組件，用於顯示任務列表

/**
 * Home組件：任務管理應用的主要頁面
 * 功能：
 * 1. 允許用戶輸入新任務
 * 2. 管理任務列表狀態
 * 3. 顯示所有已添加的任務
 */
export default function Home() {
  // 狀態管理
  const [tasks, setTasks] = useState([]); // 初始化空任務陣列，用於存儲所有任務
  const [newTask, setNewTask] = useState(''); // 初始化空字符串，用於存儲輸入框中的新任務文本

  /**
   * addTask函數：處理添加新任務的邏輯
   * 步驟：
   * 1. 記錄當前任務列表狀態
   * 2. 將新任務添加到列表中
   * 3. 更新狀態
   * 4. 清空輸入框
   */
  const addTask = () => {
    console.log("Before:", tasks); // 輸出添加前的任務列表，用於調試
    console.log("NewTask:", newTask) // 輸出要添加的新任務內容
    const updatedTasks = [...tasks, newTask]; // 使用展開運算符創建新陣列，保持原陣列不變（不可變性原則）
    setTasks(updatedTasks); // 使用state更新函數更新任務列表
    console.log("After:", updatedTasks); // 輸出更新後的任務列表，用於確認更新成功
    setNewTask(''); // 重置輸入框為空，準備下一次輸入
  }

  // 返回組件的JSX結構
  return (
    // main容器：整個應用的主要區域
    <main className="p-4"> {/* 設置內邊距為4個單位 */}
      {/* 頁面標題 */}
      <h1 className="text-2xl font-bold">Task Board</h1>

      {/* 任務輸入區域：包含輸入框和添加按鈕 */}
      <div className="flex gap-2 mb-4"> {/* 使用flex布局，設置間距和下邊距 */}
        {/* 任務輸入框 */}
        <input
          className="boarder p-2 flex-1" // 設置邊框、內邊距，並佔用剩餘空間
          placeholder="Enter a task" // 提示文本
          value={newTask} // 將輸入框的值與newTask狀態綁定
          onChange={(e) => setNewTask(e.target.value)} // 當輸入內容改變時更新newTask狀態
        />
        {/* 添加任務按鈕 */}
        <button
          className="bg-blue-500 text-white px-4" // 設置藍色背景、白色文字和水平內邊距
          onClick={addTask} // 點擊時觸發addTask函數
        >Add</button>
      </div>
      
      {/* 任務列表區域 */}
      <TaskList tasks={tasks} /> {/* 將任務陣列作為props傳遞給TaskList組件 */}
    </main>
  );
}
