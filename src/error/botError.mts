import ExtensibleCustomError from 'extensible-custom-error';

// UncaughtException
export class BotUnknownError extends ExtensibleCustomError {}

// OnCommand
export class BotCommandError extends ExtensibleCustomError {}

// Channel
export class BotInsertChannelError extends ExtensibleCustomError {}
export class BotUpdateChannelJoinError extends ExtensibleCustomError {}
export class BotUpdateChannelSuspendError extends ExtensibleCustomError {}

// Ignore
export class BotInsertIgnoreError extends ExtensibleCustomError {}
export class BotDeleteIgnoreError extends ExtensibleCustomError {}

// Filter
export class BotInsertFilterError extends ExtensibleCustomError {}
export class BotDeleteFilterError extends ExtensibleCustomError {}

// Count
export class BotUpsertCountError extends ExtensibleCustomError {}
export class BotUpdateCountByNameError extends ExtensibleCustomError {}
export class BotUpdateCountAllError extends ExtensibleCustomError {}
