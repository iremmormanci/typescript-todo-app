import { ToDo } from "./type";
import { readFileSync, writeFileSync } from 'fs';
import { ulid } from 'ulid';

export const DB_PATH = './db.json';

// DB okuma
export function readDB(): { toDos: ToDo[] } {
  return JSON.parse(readFileSync(DB_PATH, 'utf-8'));
}

// DB yazma
export function writeDB(data: { toDos: ToDo[] }) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function addTask(parameters:{
    description:string,
    isCompleted:boolean
}
):{success:boolean; message:string; toDo? :ToDo}{
    const db=readDB();
    const { description} = parameters;

    if(!description.trim()){
        return{success:false,message:"Açıklama yok"
        };
    }
    const newtask:ToDo={
    id:ulid(),//ulid id kullanılcak 
    description,
    isCompleted :false
    };
    db.toDos.push(newtask);
    writeDB(db)
    return{
        success: true,message: "Görev başarı ile eklendi",toDo:newtask
    }
}
export function deleteTask(taskid:string):
{ success: boolean, message: string }{
    const db=readDB();
    const originalLength = db.toDos.length; //görev sayısı alma
 
    //silmek istediğim id taskid eşitse sil yeni dizi ekle
    db.toDos = db.toDos.filter(task => task.id !== taskid);//Görevin (task) id'si, verilen taskid'ye eşit değilse seç.

    if(db.toDos.length===originalLength){
        return { success: false, message: ` ID ${taskid} ile eşleşen görev bulunamadı.` };
    }
    writeDB(db);
  return { success: true, message: `Görev silindi: ID ${taskid}` };
}
export function listTask():
{success:boolean; message:string; tasks? :ToDo[];}{

    const db=readDB();
    //todos var mı içi boş mu 
    if (!db.toDos || db.toDos.length === 0) {
        return {success: false,message: "Görev bulunamadı."
        };
      }
    
      return {success: true,message: "Görevler başarıyla listelendi.",tasks: db.toDos
      };
}
   

