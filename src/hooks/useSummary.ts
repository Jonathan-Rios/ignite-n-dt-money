import { useMemo } from "react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  // ? Usando o useMemo, para evitar o recálculo do summary a cada renderização, deixando só quando transactions mudar
  const summary = useMemo(() => {
    // ? Reduce é um método que percorre o array e retorna um único valor
    const resultado = transactions.reduce(
      // ? Uma dica importante, é entender que o "acc" é praticamente o item passado lá abaixo "{ income: 0, outcome: 0, total: 0}"
      // ? Portanto, devemos incrementar aquele valor para cada loop que é passado, isso é o Reduce.

      (acc, transaction) => {
        // ? Transaction já é o "item" do array passado ao reduce
        // ? o Acc é o valor atual do valor inicial passado (lá em baixo), e a cada loop incrementamos o valor dele
        if (transaction.type === "income") {
          acc.income += transaction.price;
          acc.total += transaction.price;
        } else {
          acc.outcome += transaction.price;
          acc.total -= transaction.price;
        }

        // ? Para que seja incrementado, devemos retornar o acc depois de modificá-lo
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );

    return resultado;
  }, [transactions]);

  return summary;
}
