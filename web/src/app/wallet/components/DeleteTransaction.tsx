import { useTransactionStore } from '@/store/useTransactionsStore'
import { AlertDialog, Button, Flex, IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { useCallback } from 'react'

interface DeleteTransactionProps {
  transactionId: string
  currencyId: string
}

export function DeleteTransaction({
  transactionId,
  currencyId,
}: DeleteTransactionProps) {
  const deleteTransaction = useTransactionStore(
    useCallback((state) => state.deleteTransaction, []),
  )

  function handleDeleteTransaction(transactionId: string) {
    deleteTransaction(transactionId, currencyId)
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton variant="ghost" color="gray">
          <Trash2 size={18} />
        </IconButton>
      </AlertDialog.Trigger>

      <AlertDialog.Content style={{ maxWidth: 450, borderRadius: 10 }}>
        <AlertDialog.Title>Excluir transação</AlertDialog.Title>
        <AlertDialog.Description>
          Tem certeza que deseja excluir esta transação?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancelar
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={() => handleDeleteTransaction(transactionId)}
            >
              Excluir
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
