'use client'

import { deleteTransaction } from '@/actions/transactions/deleteTransaction'
import { AlertDialog, Button, Flex, IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'

interface DeleteTransactionProps {
  transactionId: string
  currencyId: string
}

export function DeleteTransaction({
  transactionId,
  currencyId,
}: DeleteTransactionProps) {
  async function handleDeleteTransaction(transactionId: string) {
    const response = await deleteTransaction(transactionId, currencyId)

    if (response?.deleteTransactionError) {
      return toast.error(response.deleteTransactionError)
    }

    toast.success('Transação excluída com sucesso!')
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="hover:bg-[#f0f0f3] transition-colors">
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
              style={{ backgroundColor: '#e5484d' }}
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
