import test from 'ava';
import { ToDo } from '../src/type';
import { addTask,deleteTask,listTask,DB_PATH } from '../src/todo';
import fs from 'fs';
import { ulid } from 'ulid';

test.beforeEach(() => {
    fs.writeFileSync(DB_PATH, JSON.stringify({
      toDos: [],
    }, null, 2));
  });

test('Görev eklendi mi?',t=>{
    const toDo:ToDo={
        id:ulid(),
        description:'Balkonu yıka',
        isCompleted:false
    }
    const result=addTask({ description:toDo.description, isCompleted:toDo.isCompleted })
    t.true(result.success);
    t.is(result.message, "Görev başarı ile eklendi");
})
test('Görev başarılı bir şekilde siliniyor mu?',t=>{

  fs.writeFileSync(DB_PATH, JSON.stringify({
    toDos: [
      {
        id: 2,
        description: 'Balkonu yıka',
        isCompleted: false
      }
    ]
  }, null, 2));

const result=deleteTask(ulid());

t.true(result.success);
t.is(result.message, `Görev silindi: ID ${ulid}`)
})

test('Tüm görevler listeleniyor mu?',t=>{

  fs.writeFileSync(DB_PATH, JSON.stringify({
    toDos: [
      { id: 1, description: 'Balkonu yıka', isCompleted: false },
      { id: 2, description: 'Çamaşırları as', isCompleted: true }
    ]
  }, null, 2));

  const result=listTask();

  t.true(result.success);
  t.is(result.message, "Görevler başarıyla listelendi.");
})