// Загрузка переменных окружения для локального подключения
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/client/client.js';
import type { WorkLogCreateInput } from '../src/generated/client/models.js';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Типы работ
const workTypes = [
  { name: 'Штукатурка', unit: 'кв.м', minVol: 20, maxVol: 80 },
  { name: 'Кирпичная кладка', unit: 'куб.м', minVol: 5, maxVol: 25 },
  { name: 'Бетонная стяжка', unit: 'кв.м', minVol: 15, maxVol: 50 },
  { name: 'Покраска стен', unit: 'кв.м', minVol: 30, maxVol: 120 },
  { name: 'Монтаж ГКЛ', unit: 'кв.м', minVol: 10, maxVol: 40 }
];

const workers = ['Иванов А.А.', 'Петров С.С.', 'Сидоров А.В.', 'Кузнецов И.М.', 'Попов В.Н.'];

// Функция генерации случайной даты за последний месяц
function getRandomDate(): Date {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 30);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  console.log('Инициализация наполнения СУБД (Seed)...');

  // Очистка таблицы перед заполнением
  await prisma.workLog.deleteMany();

  const recordsToInsert: WorkLogCreateInput[] = [];

  for (let i = 0; i < 10; i++) {
    const randomWork = workTypes[Math.floor(Math.random() * workTypes.length)];
    const randomWorker = workers[Math.floor(Math.random() * workers.length)];
    
    // Чередование должностей
    const workerTypeName = i % 3 === 0 ? 'прораб' : 'работник';
    const volume = parseFloat((Math.random() * (randomWork.maxVol - randomWork.minVol) + randomWork.minVol).toFixed(1));

    // Сборка объекта в строгом соответствии с типом CreateWorkLog
    const newLog: WorkLogCreateInput = {
      doneAt: getRandomDate(),
      workTypeName: randomWork.name,
      volume: volume,
      workTypeUnit: randomWork.unit,
      workerName: randomWorker,
      workerTypeName: workerTypeName
    };

    recordsToInsert.push(newLog);
  }

  // Массовая вставка данных одной транзакцией
  await prisma.workLog.createMany({
    data: recordsToInsert
  });

  const finalCount = await prisma.workLog.count();
  console.log(`Успешно добавлено записей: ${finalCount}`);
}

main()
  .catch((e) => {
    console.error('Ошибка при выполнении seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
