import { ProphecyType, TarotCard } from "@/types/tarot";
import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	const setValue = useCallback(
		(value: T | ((val: T) => T)) => {
			try {
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;
				setStoredValue(valueToStore);
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			} catch (error) {
				console.warn(`Error setting localStorage key "${key}":`, error);
			}
		},
		[key, storedValue],
	);

	return [storedValue, setValue] as const;
}

export interface GameState {
	coins: number;
	readCards: Record<ProphecyType, number | null>;
	lastResetDate: string;
	currentProphecy: {
		type: string;
		cardId: number;
	} | null;
}

export const initialGameState: GameState = {
	coins: 30,
	readCards: { daily: null, love: null, work: null, health: null },
	lastResetDate: new Date().toDateString(),
	currentProphecy: null,
};

export function useGameState() {
	const [gameState, setGameState] = useLocalStorage<GameState>(
		"tarot-game-state",
		initialGameState,
	);

	// Check for midnight reset
	useEffect(() => {
		const today = new Date().toDateString();

		if (gameState.lastResetDate !== today) {
			resetGameState();
		}
	}, [gameState, setGameState]);

	const resetGameState = useCallback(() => {
		const today = new Date().toDateString();
		setGameState({
			...gameState,
			readCards: { daily: null, love: null, work: null, health: null },
			lastResetDate: today,
			currentProphecy: null,
		});
	}, [gameState, setGameState]);

	const spendCoins = useCallback(
		(amount: number) => {
			if (gameState.coins >= amount) {
				setGameState({
					...gameState,
					coins: gameState.coins - amount,
				});
				return true;
			}
			return false;
		},
		[gameState, setGameState],
	);

	const earnCoins = useCallback(
		(amount: number) => {
			setGameState({
				...gameState,
				coins: gameState.coins + amount,
			});
		},
		[gameState, setGameState],
	);

	const updateReadCards = useCallback(
		(cardType: ProphecyType, id: number) => {
			if (!gameState.readCards[cardType]) {
				setGameState((prev) => {
					if (prev.readCards[cardType]) return prev;

					return {
						...prev,
						readCards: {
							...prev.readCards,
							[cardType]: id,
						},
					};
				});
			}
		},
		[gameState, setGameState],
	);

	const setCurrentProphecy = useCallback(
		(prophecy: { type: ProphecyType; cardId: number } | null) => {
			setGameState({
				...gameState,
				currentProphecy: prophecy,
			});
		},
		[gameState, setGameState],
	);

	const isCardRead = useCallback(
		(cardType: ProphecyType) => {
			return gameState.readCards[cardType] != null;
		},
		[gameState.readCards],
	);

	return {
		coins: gameState.coins,
		readCards: gameState.readCards,
		currentProphecy: gameState.currentProphecy,
		resetGameState,
		spendCoins,
		earnCoins,
		updateReadCards,
		setCurrentProphecy,
		isCardRead,
	};
}
