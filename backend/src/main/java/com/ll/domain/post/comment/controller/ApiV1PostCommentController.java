package com.ll.domain.post.comment.controller;

import com.ll.domain.member.member.entity.Member;
import com.ll.domain.post.comment.dto.PostCommentDto;
import com.ll.domain.post.comment.entity.PostComment;
import com.ll.domain.post.post.entity.Post;
import com.ll.domain.post.post.service.PostService;
import com.ll.global.exceptions.ServiceException;
import com.ll.global.rq.Rq;
import com.ll.global.rsData.RsData;
import com.ll.standard.base.Empty;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts/{postId}/comments")
@RequiredArgsConstructor
@Tag(name = "ApiV1PostCommentController", description = "API 댓글 컨트롤러")
@SecurityRequirement(name = "bearerAuth")
public class ApiV1PostCommentController {
    private final PostService postService;
    private final Rq rq;

    @GetMapping
    @Transactional(readOnly = true)
    @Operation(summary = "댓글 조회")
    public List<PostCommentDto> items (
            @PathVariable long postId
    ) {
        Post post = postService.findById(postId).orElseThrow(
                () -> new ServiceException("404-1", "%d번 글은 존재하지 않습니다.".formatted(postId))
        );

        return post
                .getComments()
                .stream()
                .map(PostCommentDto::new)
                .toList();
    }

    @DeleteMapping("/{id}")
    @Transactional
    @Operation(summary = "댓글 삭제")
    public RsData<Empty> delete (
            @PathVariable long postId,
            @PathVariable long id
    ) {
        Member author = rq.getActor();

        Post post = postService.findById(postId).orElseThrow(
                () -> new ServiceException("404-1", "%d번 글은 존재하지 않습니다.".formatted(postId))
        );

        PostComment postComment = post.getCommentById(id).orElseThrow(
                () -> new ServiceException("404-2", "%d번 댓글은 존재하지 않습니다.".formatted(id))
        );

        postComment.checkActorCanDelete(author);
        post.removeComment(postComment);

        return new RsData<>(
                "200-1",
                "%d번 댓글이 삭제되었습니다.".formatted(id)
        );
    }

    record PostCommentModifyReqBody(
            @NotBlank
            @Length(min = 2, max = 10000000)
            String content
    ) {
    }

    @PutMapping("/{id}")
    @Transactional
    @Operation(summary = "댓글 수정")
    public RsData<PostCommentDto> modify (
            @PathVariable long postId,
            @PathVariable long id,
            @RequestBody @Valid PostCommentModifyReqBody reqBody
    ) {
        Member author = rq.getActor();

        Post post = postService.findById(postId).orElseThrow(
                () -> new ServiceException("404-1", "%d번 글은 존재하지 않습니다.".formatted(postId))
        );

        PostComment postComment = post.getCommentById(id).orElseThrow(
                () -> new ServiceException("404-2", "%d번 댓글은 존재하지 않습니다.".formatted(id))
        );

        postComment.checkActorCanModify(author);
        postComment.modify(reqBody.content);

        return new RsData<>(
                "200-1",
                "%d번 댓글이 수정되었습니다.".formatted(id),
                new PostCommentDto(postComment)
        );
    }

    record PostCommentWriteReqBody(
            @NotBlank
            @Length(min = 2, max = 10000000)
            String content
    ) {
    }

    @PostMapping
    @Transactional
    @Operation(summary = "댓글 작성")
    public RsData<PostCommentDto> write (
            @PathVariable long postId,
            @RequestBody @Valid PostCommentWriteReqBody reqBody
    ) {
        Member author = rq.getActor();

        Post post = postService.findById(postId).orElseThrow(
                () -> new ServiceException("404-1", "%d번 글은 존재하지 않습니다.".formatted(postId))
        );

        PostComment postComment = post.addComment(author, reqBody.content);

        postService.flush();

        return new RsData<>(
                "201-1",
                "%d번 댓글이 등록되었습니다.".formatted(postComment.getId()),
                new PostCommentDto(postComment)
        );
    }
}
