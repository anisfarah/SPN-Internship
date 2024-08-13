import moment from 'moment';

const getNewCommentConfig = async (comments: any[], agencyId: string) => [
  {
    type: 'add',
    name: 'addComment',
    addButtonLabel: 'Add Comment',
    title: 'New Comment',
    updatable: false,
    config: {
      fields: [
        ...comments?.map((comment: any, index: any) => [
          {
            name: `comment_${index}`,
            label: `By ${comment?.commentedBy?.firstName} ${comment?.commentedBy?.lastName} `,
            secondLabel: `${moment(comment?.commentedAt).format('DD/MM/YYYY - HH:mm')}`,
            disabled: true,
            type: 'textArea',
            rows: 2,
            defaultValue: comment.comment
          }
        ]),

        [
          {
            name: 'comment',
            type: 'textArea',
            rows: 2,
            defaultValue: ''
          }
        ]
      ],

      options: { withAccordion: false }
    }
  },
  {
    name: 'id',
    type: 'hidden',
    value: agencyId
  }
];
export default getNewCommentConfig;
