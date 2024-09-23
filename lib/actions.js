'use server'

import { revalidatePath } from "next/cache"
import { createClient } from "./supabase/server"
import { transactionSchema } from "./validation"
import { redirect } from 'next/navigation'





export async function createTransaction(formData) {
  const validated = transactionSchema.safeParse(formData)
 
  if (!validated.success) {
    throw new Error('Invalid data')
  }

  const supabase = createClient()

  // Validate data

  const { error } = await supabase.from('transactions')
    .insert([validated.data])
  console.log(error)
  if (error) {
    throw new Error('Something went wrong try again')

  }

  revalidatePath('/dashboard')
}

export async function updateTransaction(id, formData) {
  const validated = transactionSchema.safeParse(formData)
  if (!validated.data) {
    throw new Error('Invalid data')
  }

  const supabase = createClient()

  // Validate data

  const { error } = await supabase.from('transactions')
    .update([validated.data])
    .eq('id', id)

  if (error) {
    throw new Error('Something went wrong try again')
  }

  revalidatePath('/dashboard')
}

export async function fetchTransaction(range, offset = 0, limit = 10) {
  const supabase = createClient()
  let { data, error } = await supabase
    .rpc('fetch_transactions', {
      limit_arg: limit,
      offset_arg: offset,
      range_arg: range
    })
  if (error) throw new Error("Problem fetching data")
  return data
}

export async function deleteTransaction(id) {
  const supabase = createClient()
  const { error } = await supabase.from('transactions').delete().eq('id', id)
  if (error) throw new Error(`Could not delete the transaction ${id}`)
  revalidatePath('/dashboard')
}

export async function login(prevState, formData) {
  const supabase = createClient();
  const email = formData.get('email');

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
      // Update this URL if necessary
    }
  });

  if (error) {
    console.error('Error during sign-in:', error.message);
    return {
      error: true,
      message: 'Error Authenticating',
    };
  }

  return {
    error: false,
    message: 'Check your email for the login link!',
  };
}



export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  redirect('/login')
}

export async function uploadAvatar(prevState, formData) {
  const supabase = createClient()
  const file = formData.get('file')

  const fileExt = file.name.split('.').pop()
  const filename = `${Math.random()}.${fileExt}`

  const { error } = await supabase.storage
    .from('avatars')
    .upload(filename, file) 

  if (error) {
    return {
      error: true,
      message: 'Error uploading avatar'
    }
  }

  const {data: userData, userError} = await supabase.auth.getUser()

  if(userError) {
    return {
      error: true,
      message: 'Something went wrong, try again'
    }
  }

  const avatar = userData.user.user_metadata.avatar

  if (avatar) {
    const { error } = await supabase.storage
    .from('avatars')
    .remove([avatar])

    if(error) {
      return {
        error: true,
        message: 'Something went wrong try again'
      }
    }
  }

  const { error: dataUpdateError } = await supabase.auth
    .updateUser({
      data: {
        avatar: filename
      }
    })

  if (dataUpdateError) {
    return {
    error: true,
    message: 'Error associating the avatar with the user'
  }

}

return {
  message: 'User avatar updated'
}

}

export async function updateSettings(prevState, formData) {

}