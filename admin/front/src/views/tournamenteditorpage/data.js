const question2 = {
    type: 'qcm',
    content: {
        question: '',
        options: [{ content: '', right: true }]
    }
};

export default {
    question: {
        type: 'qcm',
        content: {
            question: '',
            options: [{ content: '', right: true }]
        }
    },
    questions: [question2],
    option: [{
        content: '',
        right: true,
    }],
    types: [
        { value: 'qcm', name: 'QCM : Réponse simple' },
        { value: 'qrm', name: 'DCM : Réponses multiples' },
        { value: 'free', name: 'Texte' }
    ],

};