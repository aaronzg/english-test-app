import { useCallback } from 'react'
import type { GlobalTestData } from '../types'

export const usePersistence = (testNumber: number) => {
  const getStorageKey = useCallback((key: string) => `${testNumber}-${key}`, [testNumber])

  const saveTestData = useCallback((data: GlobalTestData) => {
    try {
      localStorage.setItem(getStorageKey('data'), JSON.stringify(data))
    } catch (error) {
      console.error('Error saving test data to localStorage:', error)
    }
  }, [getStorageKey])

  const loadTestData = useCallback((): GlobalTestData => {
    try {
      const data = localStorage.getItem(getStorageKey('data'))
      return data ? JSON.parse(data) : {}
    } catch (error) {
      console.error('Error loading test data from localStorage:', error)
      return {}
    }
  }, [getStorageKey])

  const saveCurrentTab = useCallback((tab: number) => {
    try {
      localStorage.setItem(getStorageKey('current-tab'), tab.toString())
    } catch (error) {
      console.error('Error saving current tab to localStorage:', error)
    }
  }, [getStorageKey])

  const loadCurrentTab = useCallback((): number | null => {
    try {
      const tab = localStorage.getItem(getStorageKey('current-tab'))
      return tab ? parseInt(tab, 10) : null
    } catch (error) {
      console.error('Error loading current tab from localStorage:', error)
      return null
    }
  }, [getStorageKey])

  const saveInitialValues = useCallback((optionValue: number, startValue: number) => {
    try {
      localStorage.setItem(
        getStorageKey('initial-values'),
        JSON.stringify({ optionValue, startValue })
      )
    } catch (error) {
      console.error('Error saving initial values to localStorage:', error)
    }
  }, [getStorageKey])

  const loadInitialValues = useCallback((): { optionValue: number; startValue: number } | null => {
    try {
      const values = localStorage.getItem(getStorageKey('initial-values'))
      return values ? JSON.parse(values) : null
    } catch (error) {
      console.error('Error loading initial values from localStorage:', error)
      return null
    }
  }, [getStorageKey])

  const clearTestData = useCallback(() => {
    try {
      localStorage.removeItem(getStorageKey('data'))
      localStorage.removeItem(getStorageKey('current-tab'))
      localStorage.removeItem(getStorageKey('initial-values'))
    } catch (error) {
      console.error('Error clearing test data from localStorage:', error)
    }
  }, [getStorageKey])

  const clearAllTestData = useCallback(() => {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(`${testNumber}-`)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Error clearing all test data from localStorage:', error)
    }
  }, [testNumber])

  return {
    saveTestData,
    loadTestData,
    saveCurrentTab,
    loadCurrentTab,
    saveInitialValues,
    loadInitialValues,
    clearTestData,
    clearAllTestData
  }
}
