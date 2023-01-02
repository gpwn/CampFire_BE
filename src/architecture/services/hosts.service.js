const HostsRepository = require('../repositories/hosts.repository');
const { Hosts } = require('../../models');
require('dotenv').config();
const hash = require('../../util/auth-encryption.util');
const { createHostToken } = require('../../util/auth-jwtToken.util.js');

class HostsService {
    hostsRepository = new HostsRepository(Hosts);

    //회원가입 API
    signUp = async (email, hostName, password, phoneNumber, profileImg) => {
        const hashValue = hash(password);
        const host = await this.hostsRepository.createHost(
            email,
            hostName,
            hashValue,
            phoneNumber,
            profileImg
        );
        return host;
    };

    //아이디/닉네임 중복확인 API
    findDup = async (query) => {
        const prop = Object.keys(query)[0];
        const value = Object.values(query)[0];
        if (prop === 'email') {
            const host = await this.hostsRepository.findOneHostByEmail(value);
            if (host) {
                throw '이미 사용중인 이메일입니다.';
            } else {
                return '이메일 중복확인에 성공하였습니다.';
            }
        } else if (prop === 'hostName') {
            const host = await this.hostsRepository.findOneHostByHostName(
                value
            );
            if (host) {
                throw '이미 사용중인 닉네임입니다.';
            } else {
                return '닉네임 중복확인에 성공하였습니다.';
            }
        } else {
            throw 'Service findDup Error';
        }
    };

    logIn = async (email, password) => {
        const hashValue = hash(password);
        const host = await this.hostsRepository.findHostByAuth(
            email,
            hashValue
        );

        if (!host) {
            throw '아이디 또는 패스워드가 일치하지 않습니다.';
        }

        const accessToken = createHostToken(host.hostId, '1h');
        const refreshToken = createHostToken('refreshToken', '1d');
        await this.hostsRepository.updateRefreshToken(refreshToken, email);

        return { accessToken, refreshToken };
    };
}

module.exports = HostsService;