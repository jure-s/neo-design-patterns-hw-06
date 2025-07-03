import { format } from 'date-fns';

// Декоратор: додає timestamp на початок повідомлення
export function withTimestamp<
  This,
  Args extends [string, ...unknown[]],
  Return
>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, typeof originalMethod>
): typeof originalMethod {
  return function (this: This, ...args: Args): Return {
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const modifiedArgs: Args = [`[${timestamp}] ${args[0]}`, ...args.slice(1)] as Args;
    return originalMethod.apply(this, modifiedArgs);
  };
}

// Декоратор: перетворює повідомлення на великі літери
export function uppercase<
  This,
  Args extends [string, ...unknown[]],
  Return
>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, typeof originalMethod>
): typeof originalMethod {
  return function (this: This, ...args: Args): Return {
    const upperArgs: Args = [args[0].toUpperCase(), ...args.slice(1)] as Args;
    return originalMethod.apply(this, upperArgs);
  };
}
