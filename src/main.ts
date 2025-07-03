import { MessageService } from './MessageService';
import { createRateLimitProxy } from './RateLimitProxy';

const messageService = new MessageService();
const service = createRateLimitProxy(messageService, 1000); // 1 секунда

console.log("Тестуємо систему анти-спаму:");
service.send("Привіт! Як справи?");
service.send("Чому не відповідаєш?");

setTimeout(() => {
  service.send("Це повідомлення вже пройде, бо ми почекали 1 секунду");
}, 1100);
