class IssuesRepository {
    async getInitialIssues() {
        const url: string = 'https://api.github.com/repos/lodash/lodash/issues?page=1&per_page=10'
        const options: {
            headers: {
                "Accept": string;
            },
        } = {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
        }

        return await fetch(url, options);
    }
    async getNextIssues(page: number) {
        const url: string = `https://api.github.com/repos/lodash/lodash/issues?page=${page}&per_page=5`
        const options: {
            headers: {
                "Accept": string;
            },
        } = {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
        }

        return await fetch(url, options);
    }

}

export const issuesRepository = new IssuesRepository();
