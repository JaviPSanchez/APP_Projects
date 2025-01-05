FROM python:3.12.1-alpine3.19
LABEL maintainer="atalaya.digital"

ENV PYTHONUNBUFFERED=1

# Set environment variable needed for ElasticFileSystem in AWS
ARG UID=101
COPY ./requirements.txt /tmp/requirements.txt
COPY ./requirements.dev.txt /tmp/requirements.dev.txt
COPY ./scripts /scripts
COPY ./src /src
WORKDIR /src
EXPOSE 8000

ARG DEV=false
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client jpeg-dev && \
    apk add --update --no-cache --virtual .tmp-build-deps \
        build-base postgresql-dev musl-dev zlib zlib-dev linux-headers && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    if [ "$DEV" = "true" ]; then /py/bin/pip install -r /tmp/requirements.dev.txt; fi && \
    rm -rf /tmp && \
    apk del .tmp-build-deps && \
    adduser \
        --uid $UID \
        --disabled-password \
        --no-create-home \
        javipalosanchez1 && \
    mkdir -p /vol/web/static && \
    mkdir -p /vol/web/media && \
    chown -R javipalosanchez1:javipalosanchez1 /vol/web && \
    chmod -R 777 /vol/web && \
    chmod -R +x /scripts

ENV PATH="/scripts:/py/bin:$PATH"

USER javipalosanchez1

# Volumes expected to be use from this Docker image (needed for ECS)
VOLUME /vol/web/media
VOLUME /vol/web/static

CMD ["run.sh"]
