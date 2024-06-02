import { mnemonicToAccount, english, generateMnemonic } from 'viem/accounts'

import {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  parseGwei,
} from 'viem'
import Ocean from './config/chain'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import './index.css'
import { ReloadIcon } from '@radix-ui/react-icons'

function App() {
  const [loading, setLoading] = useState(true)
  const [loadingTransaction, setLoadingTransaction] = useState(false)
  const [walletClient, setWalletClient] = useState(null)
  const [account, setAccount] = useState(null)
  const [publicClient, setPublicClient] = useState(null)

  const createAccount = async () => {
    const mnemonic = generateMnemonic(english)
    alert('Pls save your mnemonic: ' + mnemonic)

    localStorage.setItem('mnemonic', mnemonic)

    initWallet()
  }

  const importAccount = async () => {
    const mnemonic = prompt('Enter your mnemonic')

    if (!mnemonic) {
      return
    }

    localStorage.setItem('mnemonic', mnemonic)

    initWallet()
  }

  const sendTransaction = async () => {
    try {
      setLoadingTransaction(true)
      const hash = await walletClient.sendTransaction({
        to: '0x2A51778703cdB854D88ca1C918b253589EF99802',
        value: parseEther('0.00005'),
        gas: 21000,
        gasPrice: parseGwei('1.5'),
      })

      const transaction = await publicClient.waitForTransactionReceipt({
        hash,
      })

      if (transaction?.status === 'success') {
        alert('Transaction sent successfully')
      }

      setLoadingTransaction(false)
    } catch (error) {
      console.error(error?.message || error)
      setLoadingTransaction(false)
    }
  }

  const initWallet = async () => {
    setLoading(true)

    const mnemonic = localStorage.getItem('mnemonic')

    if (!mnemonic) {
      setLoading(false)
      return
    }

    const account = mnemonicToAccount(mnemonic)

    if (!account) {
      return
    }

    setAccount(account.address)

    const walletClient = createWalletClient({
      chain: Ocean,
      transport: http(),
      account,
    })

    setWalletClient(walletClient)

    const publicClient = createPublicClient({
      chain: Ocean,
      transport: http(),
    })

    setPublicClient(publicClient)

    setLoading(false)
  }

  useEffect(() => {
    initWallet()
  }, [])

  return (
    <div className='flex items-center flex-col m-auto'>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className={'mb-4 text-4xl font-extrabold'}>EVM Wallet</h1>
          <div className='flex gap-2'>
            {account ? (
              <div className='flex flex-col'>
                <p className='mb-2'>Connected account: {account}</p>

                <Button disabled={loadingTransaction} onClick={sendTransaction}>
                  {loadingTransaction && (
                    <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  send transaction
                </Button>
              </div>
            ) : (
              <>
                <Button onClick={createAccount}>Create new account</Button>
                <Button onClick={importAccount}>Import existing account</Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App
