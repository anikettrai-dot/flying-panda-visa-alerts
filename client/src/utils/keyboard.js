// Keyboard shortcut utilities

export const setupKeyboardShortcuts = (handlers) => {
    const handleKeyDown = (e) => {
        const isCtrlOrCmd = e.ctrlKey || e.metaKey;

        // Ctrl/Cmd + K - Focus search
        if (isCtrlOrCmd && e.key === 'k') {
            e.preventDefault();
            handlers.onSearch?.();
        }

        // Ctrl/Cmd + N - New alert
        if (isCtrlOrCmd && e.key === 'n') {
            e.preventDefault();
            handlers.onNew?.();
        }

        // ESC - Clear search
        if (e.key === 'Escape') {
            handlers.onEscape?.();
        }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
};
