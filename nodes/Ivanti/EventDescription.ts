import { INodeProperties } from 'n8n-workflow';

export const eventOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['event'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an event',
				action: 'Create an event',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'POST',
						url: '/Frs_EVT_Events',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an event',
				action: 'Delete an event',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'DELETE',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve an event',
				action: 'Get an event',
				routing: {
					request: {
						method: 'GET',
						url: '/Frs_EVT_Events',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'value',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Count',
				value: 'getCount',
				description: 'Retrieve a count of events',
				action: 'Retrieve a count of events',
				routing: {
					request: {
						method: 'GET',
						url: '/Frs_EVT_Events',
					},
					send: {
						type: 'query',
						property: '$top',
						value: '1',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									count:
										'={{$responseItem["@odata.count"] == 0 ? 1 : $responseItem["@odata.count"] }}',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many events',
				action: 'Get many events',
				routing: {
					request: {
						method: 'GET',
						url: '/Frs_EVT_Events',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'value',
								},
							},
						],
					},
				},
			},
			{
				name: 'Link',
				value: 'link',
				description: 'Link an event',
				action: 'Link an event',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'PATCH',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an event',
				action: 'Update an event',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'PATCH',
					},
				},
			},
		],
		default: 'getAll',
	},
];

const createOperation: INodeProperties[] = [
	{
		displayName: 'Description',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['event'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'Description',
			},
		},
		description: 'Short title of the event',
	},
	{
		displayName: 'Notes',
		name: 'info',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['event'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'Notes',
			},
		},
		description: 'More information about the event',
	},
	{
		displayName: 'Source',
		name: 'source',
		type: 'options',
		options: [
			{
				name: 'ImmyBot',
				value: 'ImmyBot',
			},
			{
				name: 'Mail',
				value: 'Mail',
			},
			{
				name: 'Zabbix',
				value: 'Zabbix',
			},
		],
		default: 'ImmyBot',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['event'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'Source',
			},
		},
		description:
			'In which source the event originated. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName: 'Use Predefined Fields',
		name: 'predefined',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['create'],
			},
		},
		default: false,
		description: 'Whether object creation requires more predefined prameters',
	},
	{
		displayName: 'Predefined Fields',
		name: 'predefinedFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['create'],
				predefined: [true],
			},
		},
		default: {},
		placeholder: 'Add Predefined Field',
		options: [
			{
				displayName: 'CI Name',
				name: 'ciName',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'CIName',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which CI is related to the event',
			},
			{
				displayName: 'Outage',
				name: 'isOutage',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'IsOutage',
					},
				},
				description: 'Whether the event causes an outage',
			},
			{
				displayName: 'Owner Team',
				name: 'ownerTeam',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'OwnerTeam',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which team should investigate the event',
			},
			{
				displayName: 'Severity',
				name: 'severity',
				type: 'options',
				options: [
					{
						name: 'Low',
						value: 'Low',
					},
					{
						name: 'Medium',
						value: 'Medium',
					},
					{
						name: 'High',
						value: 'High',
					},
				],
				default: 'Low',
				routing: {
					send: {
						type: 'body',
						property: 'Severity',
						value: '={{ $value || undefined }}',
					},
				},
				description:
					'How severe is this event. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},
			{
				displayName: 'Start Date Time',
				name: 'eventStartDateTime',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'EventStartDateTime',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Date and time when the event started',
			},
			{
				displayName: 'Support Hours',
				name: 'supportHours',
				type: 'options',
				options: [
					{
						name: '9x5',
						value: '9x5',
					},
					{
						name: '24x7',
						value: '24x7',
					},
				],
				default: '9x5',
				routing: {
					send: {
						type: 'body',
						property: 'SupportHours',
						value: '={{ $value || undefined }}',
					},
				},
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
			},
			{
				displayName: 'Unread',
				name: 'isUnRead',
				type: 'boolean',
				default: true,
				routing: {
					send: {
						type: 'body',
						property: 'IsUnRead',
					},
				},
				description: 'Whether event was read',
			},
			{
				displayName: 'Customer User (ID)',
				name: 'userId',
				type: 'string',
				placeholder: '0014960452EE44259E8149C715B24DEF',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'CustomerLink_RecID',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which customer user (employee) is related to event',
			},
		],
	},
	{
		displayName: 'Send Custom Fields',
		name: 'customFields',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['create'],
			},
		},
		default: false,
		description: 'Whether creating object requires more custom prameters',
	},
	{
		displayName: 'Custom Fields',
		name: 'customProperties',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['create'],
				customFields: [true],
			},
		},
		default: {
			property: [
				{
					name: '',
					value: '',
				},
			],
		},
		placeholder: 'Add Custom Field',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'property',
				displayName: 'Custom Field',
				values: [
					{
						displayName: 'Field Name or ID',
						name: 'name',
						type: 'string',
						required: true,
						default: '',
						description: 'Name of the custom field to set',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						required: true,
						default: '',
						routing: {
							send: {
								type: 'body',
								property: '={{$parent.name}}',
								value: '={{ $value !== " " ? $value : undefined }}',
							},
						},
						description: 'Value to set on the custom field',
					},
				],
			},
		],
	},
];

const deleteOperation: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['delete'],
				resource: ['event'],
			},
		},
		routing: {
			request: {
				url: "=/Frs_EVT_Events('{{ $value }}')",
			},
			output: {
				postReceive: [
					{
						type: 'setKeyValue',
						properties: {
							Result: 'Success',
						},
					},
				],
			},
		},
		description: 'RecId value of the event in Ivanti',
	},
];

const getOperation: INodeProperties[] = [
	{
		displayName: 'ID Type',
		name: 'idType',
		type: 'options',
		options: [
			{
				name: 'Number',
				value: 'eventNumber',
			},
			{
				name: 'Record ID',
				value: 'recId',
			},
		],
		default: 'recId',
		required: true,
		noDataExpression: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['event'],
			},
		},
		description:
			'Choose ID type from the list',
	},
	{
		displayName: 'Number',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['event'],
				idType: ['eventNumber'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: '$filter',
				value: '=EventNumber eq {{ $value }}',
			},
		},
		description: 'EventNumber value of the event in Ivanti',
	},
	{
		displayName: 'Record ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['event'],
				idType: ['recId'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: '$filter',
				value: "=RecId eq '{{ $value }}'",
			},
		},
		description: 'RecId value of the event in Ivanti',
	},
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Extend Query',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Select Fields',
				name: 'select',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$select',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'Include only these fields',
				placeholder: 'EventNumber, RecId, Status, Owner',
			},
		],
		description:
			'Send additional query parameters. More <a href="https://www.odata.org/getting-started/basic-tutorial/#queryData">information</a>.',
	},
];

const getAllOperation: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			// eslint-disable-next-line n8n-nodes-base/node-param-type-options-max-value-present
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: '$top',
				value: '={{ $value }}',
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Send Sort Parameters',
		name: 'sortOptions',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether the request has sorting parameters or not',
	},
	{
		displayName: 'Sort',
		name: 'sortUi',
		type: 'fixedCollection',
		placeholder: 'Add Sort Options',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll'],
				sortOptions: [true],
			},
		},
		typeOptions: {
			multipleValues: false,
		},
		default: {
			// -----------------------------
			// There is a bug (or a feature). You can't add defaults if multipleValues is set to false
			// -----------------------------
			// sortDetails: [
			// 	{
			// 		sortBy: 'CreatedDateTime',
			// 		orderBy: 'asc',
			// 	},
			// ],
		},
		options: [
			{
				displayName: 'Sort Options',
				name: 'sortDetails',
				values: [
					{
						displayName: 'Sort Key Name or ID',
						name: 'sortBy',
						type: 'options',
						options: [
							{
								name: 'Creation Time',
								value: 'CreatedDateTime',
							},
							{
								name: 'Last Modification Time',
								value: 'LastModDateTime',
							},
						],
						description:
							'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
						default: 'CreatedDateTime',
					},
					{
						displayName: 'Sort Order',
						name: 'orderBy',
						type: 'options',
						options: [
							{
								name: 'Ascending',
								value: 'asc',
							},
							{
								name: 'Descending',
								value: 'desc',
							},
						],
						default: 'desc',
						routing: {
							send: {
								type: 'query',
								property: '$orderby',
								value: '={{ $parent.sortBy }} {{ $value }}',
							},
						},
					},
				],
			},
		],
	},
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Extend Query',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Result Filter',
				name: 'filter',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$filter',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'An expression which will filter the results',
				placeholder: "Status eq 'Open'",
			},
			{
				displayName: 'Select Fields',
				name: 'select',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$select',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'Include only these fields',
				placeholder: 'EventNumber, RecId, Status, Owner',
			},
			{
				displayName: 'Skip Records',
				name: 'skip',
				type: 'number',
				default: 100,
				typeOptions: {
					minValue: 1,
					// eslint-disable-next-line n8n-nodes-base/node-param-type-options-max-value-present
					maxValue: 100,
				},
				routing: {
					send: {
						type: 'query',
						property: '$skip',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'Use this property when looping trough more than 100 results',
			},
		],
		description:
			'Send additional query parameters. More <a href="https://www.odata.org/getting-started/basic-tutorial/#queryData">information</a>.',
	},
];

const getCountOperation: INodeProperties[] = [
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Extend Query',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getCount'],
			},
		},
		options: [
			{
				displayName: 'Result Filter',
				name: 'filter',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$filter',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'An expression which will filter the results',
				placeholder: "Status eq 'Open'",
			},
		],
		description:
			'Send additional query parameters. More <a href="https://www.odata.org/getting-started/basic-tutorial/#queryData">information</a>.',
	},
];

const updateOperation: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['update'],
				resource: ['event'],
			},
		},
		routing: {
			request: {
				url: "=/Frs_EVT_Events('{{ $value }}')",
			},
		},
		description: 'RecId value of the event in Ivanti',
	},
	{
		displayName: 'Use Predefined Fields',
		name: 'predefined',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['update'],
			},
		},
		default: false,
		description: 'Whether object creation requires more predefined prameters',
	},
	{
		displayName: 'Predefined Fields',
		name: 'predefinedFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['update'],
				predefined: [true],
			},
		},
		default: {},
		placeholder: 'Add Predefined Field',
		options: [
			{
				displayName: 'CI Name',
				name: 'ciName',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'CIName',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which CI is related to the event',
			},
			{
				displayName: 'Description',
				name: 'title',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Description',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Short title of the event',
			},
			{
				displayName: 'Notes',
				name: 'info',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Notes',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'More information about the event',
			},
			{
				displayName: 'Outage',
				name: 'isOutage',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'IsOutage',
					},
				},
				description: 'Whether the event causes an outage',
			},
			{
				displayName: 'Owner',
				name: 'owner',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Owner',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which person should investigate the event',
			},
			{
				displayName: 'Owner Team',
				name: 'ownerTeam',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'OwnerTeam',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which team should investigate the event',
			},
			{
				displayName: 'Resolution',
				name: 'resolution',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Resolution',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Resolution details of the event',
			},
			{
				displayName: 'Severity',
				name: 'severity',
				type: 'options',
				options: [
					{
						name: 'Low',
						value: 'Low',
					},
					{
						name: 'Medium',
						value: 'Medium',
					},
					{
						name: 'High',
						value: 'High',
					},
				],
				default: 'Low',
				routing: {
					send: {
						type: 'body',
						property: 'Severity',
						value: '={{ $value || undefined }}',
					},
				},
				description:
					'How severe is this event. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'options',
				options: [
					{
						name: 'ImmyBot',
						value: 'ImmyBot',
					},
					{
						name: 'Mail',
						value: 'Mail',
					},
					{
						name: 'Zabbix',
						value: 'Zabbix',
					},
				],
				default: 'ImmyBot',
				routing: {
					send: {
						type: 'body',
						property: 'Source',
						value: '={{ $value || undefined }}',
					},
				},
				description:
					'In which source the event originated. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},
			{
				displayName: 'Start Date Time',
				name: 'eventStartDateTime',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'EventStartDateTime',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Date and time when the event started',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Status',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Status of the task',
			},
			{
				displayName: 'Support Hours',
				name: 'supportHours',
				type: 'options',
				options: [
					{
						name: '9x5',
						value: '9x5',
					},
					{
						name: '24x7',
						value: '24x7',
					},
				],
				default: '9x5',
				routing: {
					send: {
						type: 'body',
						property: 'SupportHours',
						value: '={{ $value || undefined }}',
					},
				},
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
			},
			{
				displayName: 'Unread',
				name: 'isUnRead',
				type: 'boolean',
				default: true,
				routing: {
					send: {
						type: 'body',
						property: 'IsUnRead',
					},
				},
				description: 'Whether event was read',
			},
			{
				displayName: 'Customer User (ID)',
				name: 'userId',
				type: 'string',
				placeholder: '0014960452EE44259E8149C715B24DEF',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'CustomerLink_RecID',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which customer user (employee) is related to event',
			},
		],
	},
	{
		displayName: 'Send Custom Fields',
		name: 'customFields',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['update'],
			},
		},
		default: false,
		description: 'Whether creating object requires more custom prameters',
	},
	{
		displayName: 'Custom Fields',
		name: 'customProperties',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['update'],
				customFields: [true],
			},
		},
		default: {
			property: [
				{
					name: '',
					value: '',
				},
			],
		},
		placeholder: 'Add Custom Field',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'property',
				displayName: 'Custom Field',
				values: [
					{
						displayName: 'Field Name or ID',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the custom field to set',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: '={{ $parent.name !== " " ? $parent.name : undefined}}',
								value: '={{ $value !== " " ? $value : undefined }}',
							},
						},
						description: 'Value to set on the custom field',
					},
				],
			},
		],
	},
];

const linkOperation: INodeProperties[] = [
	{
		displayName: "Record ID (Event)",
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['link'],
				resource: ['event'],
			},
		},
		description: 'RecId value of the event in Ivanti',
	},
	{
		displayName: 'Relationship Name',
		name: 'relName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['link'],
				resource: ['event'],
			},
		},
		description: 'Relationship name which will be used to link business objects',
	},
	{
		displayName: 'Record ID (Related Object)',
		name: 'rid',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['link'],
				resource: ['event'],
			},
		},
		routing: {
			request: {
				url: "=/Frs_EVT_Events('{{ $parameter['id'] }}')/{{ $parameter['relName'] }}('{{ $value }}')/$Ref",
			},
		},
		description: 'RecId value of the related business object in Ivanti',
	},
];

export const eventFields: INodeProperties[] = [
	...createOperation,
	...deleteOperation,
	...getAllOperation,
	...getOperation,
	...getCountOperation,
	...updateOperation,
	...linkOperation,
];
